window.onresize = changeButtonPosition; //because the image container is set as absolute, we need a way of telling if the image is smaller on some screens to prevent a gap between the projects div and the navigation buttons

function changeButtonPosition() {
    projectContainerHeight = document.querySelector('.project-image').clientHeight
    document.querySelector('.projects').style.height = (projectContainerHeight + 15)+ 'px'
}

function init(){
    changeButtonPosition()
    gsap.set('.project', {x: '-100%'}); // images start off screen
    gsap.set('.project', {autoAlpha: 1});

    let currentStep = 0; //first image
    const totalSlides = document.querySelectorAll('.project').length //total images
    const wrapper = gsap.utils.wrap(0, totalSlides) 

    createfirstTimeline(currentStep)

    function createfirstTimeline(index) {
        leftImage = index -1 < 0 ? totalSlides -1 : index - 1; // if user presses back it will show last image
        const imageInnerRight = document.querySelector('div.project0' + index)
        const imageFurthestRight = document.querySelector('div.project0' + (index+1));
        const imageInnerLeft = document.querySelector('div.project0' + leftImage);
        const timelineIn = gsap.timeline({ id: "timelineIn" }); //creating gsap timeline
        timelineIn.fromTo(imageInnerRight, {
            x: '100%', //starting position - entering from righthand side
            }, { 
                duration: 1.3,
                x: 0, //ending position - moving into the center
            }
        ),
        timelineIn.fromTo(imageInnerLeft, {
            x: '-100%', //starting position - entering from the lefthand side
            }, { 
                duration: 1.0,
                x: -650, //ending position - moving into the far left position (partially off lefthand side)
            }, 0.7 // this sets a 0.7 second delay in tween starting
        ),
        timelineIn.fromTo(imageFurthestRight, {
            // autoAlpha: 0, //autoAlpha animates opacity - in this case from 0 to 1 
            x: '100%', //starting position (set above)
            }, { 
                duration: 1.0,
                x: 650, //ending position - moving into the far right position (partially off right side)
            }, 0.7 // this sets a 0.7 second delay in tween starting
        )
        return timelineIn;
    }

    function createTimelineIn(direction, index, current) {
        const goPrev = direction === 'prev';
        let imageFurthestLeft, imageInnerLeft, imageFurthestRight, imageInnerRight, position, overflow;
        // creating progress bar 
        progressBar = document.querySelector('.gallery-list__progress-bar') //to target in order to change position of progressbar indicator
        const progressIndicatorWidth = progressBar.clientWidth //width of progressbar indicator
        progressBarWidth = document.querySelector('.gallery-list__progress-track').clientWidth //working out width of whole progress bar (based on 100% width of page)
        console.log('progressBarWidth', progressBarWidth)
        console.log('progressIndicatorWidth', progressIndicatorWidth)
        if (current === 0 && direction === 'prev') {
            position = progressBarWidth - progressIndicatorWidth
            overflow = true; //not using at the moment, but I was going to use the overflow variable, indicating whether the user is going from first -> last or last -> first image in order to change look of animation (so it doesn't whizz across whole bar) 
        } else if(current === totalSlides -1 && direction === 'next') {
            position = 0
            overflow = true;
        } else if (direction === 'prev') {
            position = `-=` + (progressBarWidth - progressIndicatorWidth)/(totalSlides - 1);
        } else {
            position = `+=` + (progressBarWidth - progressIndicatorWidth)/(totalSlides - 1);
        }
        if (!goPrev) { //working out which images to target in order to change their position in the timeline below
            toExit = current -1 < 0 ? totalSlides -1 : current - 1;
            toEnter = index + 1 > totalSlides - 1 ? 0 : index + 1;
            imageFurthestLeft = document.querySelector('div.project0' + toExit);
            imageInnerRight = document.querySelector('div.project0' + index);
            imageFurthestRight = document.querySelector('div.project0' + toEnter);
            imageInnerLeft = document.querySelector('div.project0' + current);
        } else { //working out which images to target in order to change their position in the timeline below
            toEnter = index -1 < 0 ? totalSlides -1 : index - 1;
            toExit = current + 1 > totalSlides - 1 ? 0 : current + 1;
            imageFurthestLeft = document.querySelector('div.project0' + toEnter);
            imageFurthestRight = document.querySelector('div.project0' + toExit);
            imageInnerRight = document.querySelector('div.project0' + current)
            imageInnerLeft = document.querySelector('div.project0' + index);
        }
        const timelineIn = gsap.timeline({ id: "timelineIn" });
        timelineIn.fromTo(imageFurthestRight, {
            x: 1300, 
            }, { 
                runBackwards: goPrev ? true : false, //if user pressed back (goPrev is true) then runBackwards will reverse the start and end x position
                duration: 0.7,
                x: 650,
            } 
        ),
        timelineIn.fromTo(imageInnerRight, {
            x: 650, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: 0,
            }, 0
        ),
        timelineIn.fromTo(imageInnerLeft, {
            x: 0, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: -650,
            }, 0 
        ),
        timelineIn.fromTo(imageFurthestLeft, {
            x: -650, 
            }, { 
                runBackwards: goPrev ? true : false,
                duration: 0.7,
                x: -1300,
            }, 0 
        ),
        timelineIn.to(progressBar, {
                duration: 0.7,
                x: position
            }, 0
        )
        return timelineIn;
    }

    function updateCurrentStep(goToIndex) {
        currentStep = goToIndex;
    }

    function transition(direction, toIndex) {
        const timelineTransition = gsap.timeline({
            onStart: function() {
                console.log({fromIndex: currentStep}, {toIndex});
                updateCurrentStep(toIndex)
            }
        })
        const tlIn = createTimelineIn(direction, toIndex, currentStep) 
        timelineTransition.add(tlIn) //calls function above createTimelineIn
        return timelineTransition;
    }

    function isTweening() {
        return gsap.isTweening('.project'); //prevents user being able to click twice on arrows and flick through many images before the transition is finished
    }

    document.querySelector('button.next').addEventListener('click', function(e) {
        e.preventDefault();
        const nextStep = wrapper(currentStep+1);
        !isTweening() && transition('next', nextStep);
    })

    document.querySelector('button.prev').addEventListener('click', function(e) {
        e.preventDefault();
        const prevStep = wrapper(currentStep-1);
        !isTweening() && transition('prev', prevStep);
    })

    // make each photo swipeable 
    var swipe = Draggable.create($(".project img"), {
      type: "x",
      lockAxis : true ,
      trigger:$(".project img"),
      // fire setSwipe when swipe finished
      onDragEnd:function(){
        console.log( this.getDirection("start") );
        /*const nextStep = wrapper(currentStep+1);
        !isTweening() && transition('next', nextStep);
        TweenLite.to(this.target,1,{ x:this.lastX , y:this.lastY });*/
      }
    });

    // make each photo swipeable 
    /*var swipe = Draggable.create($(".project img"), {
      type: "x",
      throwProps: true,
      // fire setSwipe when swipe finished
      onPress:function(){
        this.lastX = this.x;
        this.lastY = this.y; 
      },
      onDragEnd:function(){
        const nextStep = wrapper(currentStep+1);
        !isTweening() && transition('next', nextStep);
        TweenLite.to(this.target,1,{ x:this.lastX , y:this.lastY }); 
      }
    });*/
}

// changed so script runs after DOM is loaded
$( document ).ready(function() {
    init();
});

/*window.addEventListener('load', function(){
    init();
});*/
