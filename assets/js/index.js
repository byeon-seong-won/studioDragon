

$(function() {

  
    // 브라우저 resize 처리
    window.addEventListener('resize', function() {
      window.location.reload();
    });
  


  // --------------- GSAP 공통 효과 --------------- 
  gsap.defaults({
    ease:"none"
  })




  // --------------- 전체 부드러운 스크롤 --------------- 
  const lenis = new Lenis()
  lenis.on('scroll', (e) => {
    console.log(e)
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time)=>{
    lenis.raf(time * 700)
  })
  gsap.ticker.lagSmoothing(0)



  

  // CYCLOPS CLUB 호버
  $('.cyclops').hover(function() {
    $(this).removeClass('hover');
    $('.main-cont .group-top .club').addClass('hover');
  }, function() {
    $(this).addClass('hover');
    $('.main-cont .group-top .club').removeClass('hover');
  })





  // --------------- menu --------------- 
  // 메뉴 클릭시
  $('.btn-menu').click(function() {
      $('#gnb').addClass('on');
  })
  $('.menu-close').click(function() {
      $('#gnb').removeClass('on');
  });












  // --------------- 메인 타임라인 : 인트로 - 텍스트 등장 --------------- 
  // 1-1) 인트로 효과
  // for (let i = 1; i < 68; i++) {
  //   firstClass=(i==1)?'on':'';
  //   $('.img-wrap').append(`<img src="./assets/images/intro-${i}.png" alt="" class="${firstClass}">`)  
  // }

  // setInterval(() => {
  //   introLoop();
  // }, 100*10);
  
  // introLoop();
  // function introLoop(){
  //   for (let idx = 0; idx < 68; idx++) {
  //     setTimeout(() => {
  //       $('.img-wrap img').eq(idx).addClass('on').siblings().removeClass('on');
  //     }, 100*idx);
  //   }
  // }

  const introMotion = gsap.timeline({
    onComplete:function(){
      $('.intro').remove();
    }
  })
  introMotion.to('.intro .guage-area .curr',1,{ width:'100%'})
  introMotion.to('.intro .guage-cont',{autoAlpha:0})
  introMotion.to('.intro .guage-area', {width:'100vw', height:'100vh'})
  introMotion.to('.intro',{autoAlpha:0})





  // 1-2) 인트로 타이머
  // let totalTime = 99;  
  // let elapsedTime = 0;  
  // let timerElement = document.querySelector('.time');
  // let timeLeftElement = document.querySelector('.time-left');
  // let barElement = document.querySelector('.curr');
  
  // let countdown = setInterval(() => {
  //     elapsedTime++;
  //     let timeLeft = totalTime - elapsedTime;
      
  //     let elapsedMinutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
  //     let elapsedSeconds = (elapsedTime % 60).toString().padStart(2, '0');
      
  //     let leftMinutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  //     let leftSeconds = (timeLeft % 60).toString().padStart(2, '0');
      
  //     timerElement.textContent = `Elapsed: 00:00:${elapsedSeconds}`;
  //     timeLeftElement.textContent = `Remaining: 00:00:${leftSeconds}`;
      
  //     barElement.style.width = `${(elapsedTime / totalTime) * 100}%`;
      
  //     if (elapsedTime >= totalTime) {
  //         clearInterval(countdown);
  //         timeLeftElement.textContent = `Remaining: 00:00:00`;
  //     }
  // }, 1000);






  // 2-1) 텍스트 등장
  mainTime = gsap.timeline({})
  mainTime.from(".sc-visual .hero-line span", 1.8, {
      y: 100,
      ease: "power4.out",
      skewY: 7,
      yPercent:100,
      stagger: {
        amount: 1
      }
   }, 'main-main+=2'
  )


  // 상단 텍스트 등장
  const mainheadTxt = new SplitType('.sc-visual .group-top .gtspan', { types: 'words, chars',});
  mainTime.from('.sc-visual .group-top .gtspan .char', {
    y: -100,
    ease: "power4.out",
    skewY: 7,
    yPercent:-100,
    stagger: {
      amount: 1
    }
  },'main-main+=2')
  // mainTime.to('.sc-visual .group-top .cyclops',{width : '100%'})




  // 2-2) 서브 텍스트 & 비디오 등장
  mainTime.from('.main-cont .group-bottom h4', {autoAlpha:0},'main-main+=3')
  mainTime.from('.sc-visual .video-small', {autoAlpha:0},'main-main+=3')

  mainTime.to('.main-cont .group-bottom a',1, {
    autoAlpha:1,
    scrub : 1,
  },'main-main+=3')

  mainTime.from('header .header-inner',{
  y: -100,
    stagger: {
      each: 0.1,
      from: "end"
    }
  }, 'main-main+=3')





  // 2-3) 아이콘 
  gsap.to(".sc-visual .ico-edit", { duration: 3, rotate: 720, repeat: -1, yoyo: true});
  gsap.to(".sc-visual .ico-heart", { duration: 1, scale: 1.2, repeat: -1, yoyo: true});
  gsap.to(".sc-visual .ico-movie", { duration: 3, rotateY: 720, repeat: -1, yoyo: true});
  gsap.to(".sc-visual .ico-star", { duration: 2.5, scale: 0.5, rotate: 720, repeat: -1, yoyo: true});
  gsap.to(".sc-visual .ico-eye", { duration: 5, rotate: 720, repeat: -1});
  gsap.to(".sc-visual .ico-arrow", { duration: 1.5, width: '100%', repeat: -1});


  
  


  // 2-4) 비디오 애니메이션
  const visaulTl = gsap.timeline({
    scrollTrigger:{
        trigger:'.sc-visual .sticky-wrapper',
        start:"0% 0%",
        end:"100% 100%",
        scrub:0,
        // markers: true,
        // toggleActions:"play play none reverse",
      },
  })

  visaulTl.to('.sc-visual .video-small .content',{
    width: "100vw",
    height: "100vh",
    'zIndex' : '500'
  })

  visaulTl.set('.sc-visual .inner',{
    autoAlpha:0
  })


  ScrollTrigger.matchMedia({

    "(min-width: 768px)": function() {
      visaulTl.set('.sc-visual .video-small',{
        'align-items': 'center',
        'justify-content': 'center',
        'zIndex' : '500'
      })
      visaulTl.to('.sc-visual .video-small .content',{
        width: "100vh",
        height: "100%",
        'zIndex' : '500'
      },'a')
      visaulTl.to('.sc-visual .video-small .content',{
        scale:0.3
      },'a')
    },
  
    
  
  
  });

  










 
    // 메뉴 텍스트 효과
    // menutl = gsap.timeline({
    //   scrollTrigger : {
    //     trigger: '.menu-ctn',
    //     start:"10% 50%",        
    //     end:"100% 90%",      
    //     markers: true,
    //     toggleActions:"play none none none",
    //   },
    // });
    // menutl.from('.menu-ctn li', 2, {
    //   y: 100,
    //   ease: "power4.out",
    //   skewY: 7,
    //   stagger: {
    //     amount: 0.3
    //   }
    // })









    // --------------- main --------------- 
    // 비디오
    // gsap.to('.video-small',{
    //   scrollTrigger:{
    //     trigger:'.video-small',
    //     start:"0% 50%",
    //     end:"40% 50%",
    //     // markers: true,
    //     toggleActions:"play play none reverse",
    //   },
    //   "width": "100vw",
    //   "height": "100vh",
    // })








 














    // cubic-bezier(0.47, 1.64, 0.76, 0.56)
    // 아이콘 애니메이션




    
    












  // --------------- clients --------------- 
  var line1swiper = new Swiper(".list-line1", {
    slidesPerView: "auto",
    loop:true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    speed: 2000,
    allowTouchMove:false
  });


  var line2swiper = new Swiper(".list-line2", {
    slidesPerView: "auto",
    loop:true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    speed: 2000,
    allowTouchMove:false
  });
















  // --------------- BLOW PAST --------------- 
  // 아이콘1
  gsap.to(".picto-ico-star", {
    scrollTrigger: {
      trigger: '.sc-client',
      start:"10% 100%",        
      end:"100% 90%",      
      toggleActions:"none play reverse none",
      // markers: true,
    },
    duration : 2,
    rotate : 720,
    repeat: -1,
    yoyo: true,
  });


  // 아이콘2
  gsap.to(".picto-ico-edit", {
    scrollTrigger: {
      trigger: '.sc-client',
      start:"10% 100%",        
      end:"100% 90%",      
      toggleActions:"none play reverse none",
      // markers: true,
    },
    duration : 3,
    rotate : 360,
    repeat: -1,
    yoyo: true,
  });


  // 텍스트 효과 / 메인
  const cltxl = gsap.timeline({
    scrollTrigger : {
      trigger: '.sc-history .headline',
      start:"0% 100%",        
      end:"100% 90%",      
      toggleActions:"play play none reverse",
    },
  });
  cltxl.from('.sc-history h3 span.line span', 1.8, {
    y: 100,
    ease: "power4.out",
    skewY: 7,
    yPercent:100,
    stagger: {
      amount: 1
    }
  })


  

  // 텍스트 효과 / 서브
  const cltxlsb = gsap.timeline({
    scrollTrigger : {
      trigger: '.sc-history',
      start:"10% 30%",        
      end:"100% 50%",  
    },
    onUpdate: changeNumber,
  });

  cltxlsb.from('.sc-history .blow-sub span', 1.8, {
    y: 100,
    ease: "power4.out",
    skewY: 7,
    yPercent:100,
    stagger: {
      amount: 1
    }
  }, 'sub+=1')

  cltxlsb.from('.sc-history .text-sub span', 1.8, {
    y: 100,
    ease: "power4.out",
    skewY: 7,
    yPercent:100,
    stagger: {
      amount: 1
    }
  }, 'sub+=2')



  // 숫자 카운트
  var startCount = {var: 0};
  gsap.to(startCount, {
    var: 16, 
    ease:"linear",
    scrollTrigger: {
      trigger: ".sc-history .blow-cont",
      start: "30% 80%",
    },
  })

  function changeNumber() {
    number.innerHTML = (startCount.var).toFixed();
  }
















    
    // --------------- banner --------------- 
    // gsap.to(".ico-smile", { duration: 2.5, rotate: 720, repeat: -1, yoyo: true});
    // 슬라이드

    bannertl = gsap.timeline({
      scrollTrigger:{
        trigger:'.sc-banner',
        start:"0% 100%",
        end:"100% 0%",
        scrub:0,
      },
    })
    bannertl.to('.sc-banner .line-1 .banner-line', {xPercent:-30 },'a')
    bannertl.to('.sc-banner .line-2 .banner-line', {xPercent:30 },'a')







    // --------------- service --------------- 
    const headTxt = new SplitType('.sc-service .group-top .subject-wrap .subject', { types: 'words, chars', });
    sertl = gsap.timeline({
      scrollTrigger:{
        trigger: ".sc-service",
        start:"0% 0%",
        end:"100% 100%",
        scrub:0,
        onUpdate:function(a) {
          pr = Math.floor(a.progress*100);
          $('.sc-service .progress-area .per').text(pr + "%");
        }
      }
    })
    // 1번째 텍스트 숫자카운트
    sertl.to('.sc-service  .subject:first-child .char',{
      y:0,
      stagger:0.01,
    },'service-first')
    sertl.to('.sc-service .group-top .step-area .change',{
      y:'-100%',
    },'service-first')

    // 2번째 텍스트 숫자카운트
    sertl.to('.sc-service  .subject:first-child .char',{
      y:'-100%',
      stagger:0.01,
    },'service-second')
    sertl.to('.sc-service  .subject:nth-child(2) .char',{
      y:0,
      stagger:0.01,
    },'service-second')
    sertl.to('.sc-service .group-top .step-area .change',{
      y:'-200%',
    },'service-second')

    // 3번째 텍스트 숫자카운트
    sertl.to('.sc-service  .subject:nth-child(2) .char',{
      y:'-100%',
      stagger:0.01,
    },'service-third')
    sertl.to('.sc-service  .subject:nth-child(3) .char',{
      y:0,
      stagger:0.01,
    },'service-third')
    sertl.to('.sc-service .group-top .step-area .change',{
      y:'-300%',
    },'service-third')

    // 4번째 텍스트 숫자카운트
    sertl.to('.sc-service  .subject:nth-child(3) .char',{
      y:'-100%',
      stagger:0.01,
    },'service-four')
    sertl.to('.sc-service  .subject:nth-child(4) .char',{
      y:0,
      stagger:0.01,
    },'service-four')
    sertl.to('.sc-service .group-top .step-area .change',{
      y:'-400%',
    },'service-four')

    // 5번째 텍스트 숫자카운트
    sertl.to('.sc-service  .subject:nth-child(4) .char',{
      y:'-100%',
      stagger:0.01,
    },'service-five')
    sertl.to('.sc-service  .subject:nth-child(5) .char',{
      y:0,
      stagger:0.01,
    },'service-five')
    sertl.to('.sc-service .group-top .step-area .change',{
      y:'-500%',
    },'service-five')




    // progress bar
    sertl.to('.sc-service .curr',1, { 
      width:'20%'
    },'service-first')
    sertl.to('.sc-service .curr',1, { 
      width:'40%'
    },'service-second')
    sertl.to('.sc-service .curr',1, { 
      width:'60%'
    },'service-third')
    sertl.to('.sc-service .curr',1, { 
      width:'80%'
    },'service-four')
    sertl.to('.sc-service .curr',1, { 
      width:'100%'
    },'service-five')




    gsap.to(".sc-service .ico-level", { duration: 10, x: 200, repeat: -1, yoyo: true});



    // time 
    const durationInSeconds = 42; // 애니메이션 지속 시간 (초)
    const initialTime = 0; // 초기 시간 (초)
    const finalTime = 42; // 최종 시간 (초)

    const timer = gsap.timeline({
      scrollTrigger: {
        trigger:  ".sc-service",
        scrub: true,
        start: "top top",
        end: "+=" + (durationInSeconds * 10) + "%", 
      },
    });
    
    timer.to("#gotime", {
      duration: durationInSeconds,
      innerHTML: finalTime,
      snap: {
        innerHTML: 1, 
      },
    });


    // timer.to("#remtime", {
    //   duration: durationInSeconds,
    //   innerHTML: initialTime, 
    //   snap: {
    //     innerHTML: 1, 
    //   },
    // });








    // rec 애니메이션
    // setInterval(()=> {
    //   $('.sc-service .group-bottom .rec-area .circ').addClass('on');
    //   recAnimation()
    // },500)

    // recAnimation();
    // function recAnimation() {
    //   setTimeout(()=> {
    //     $('.sc-service .group-bottom .rec-area .circ').removeClass('on');
    //   },1000)
    // }

    const circElement = document.querySelector('.circ');
    setInterval(() => {
        circElement.classList.add('on');
        setTimeout(() => {
          circElement.classList.remove('on');
        }, 500); // 0.5초 후에 클래스 제거
    }, 1000); // 1초마다 클래스 추가


    




    // --------------- more --------------- 

    // 영역들어오면 로고 반전
    // $(window).scroll(function(){
    //   var here = $("#sc-new").offset().top;
    //   var height = $(document).scrollTop();

    //   if(here < height){
    //     $('#header .logo-area img').addClass('invert');
    //   } else {
    //     $('#header .logo-area img').removeClass('invert');
    //   }
    // })





    asdas22 = gsap.timeline({
      scrollTrigger:{
        trigger: ".sc-new",
        start:"0% 0%",
        end:"100% 100%",
        scrub:0,
        // markers: true,
        invalidateOnRefresh: true, 
      }
    })
    asdas22.to('.sc-new .wrap',{
      xPercent:-100,
      x:function(){
        return window.innerWidth;
      }
    },'a')
    asdas22.to('.sc-new .marker',{
      left:'100%'
    },'a')


    gsap.to(".sc-new .box", {
      y: -120,
      backgroundColor: "#1e90ff",
      ease: "none",
      scrollTrigger: {
        trigger: ".sc-new .box",
        containerAnimation: asdas22,
        start: "0% 50%",
        end: "100% 50%",
        scrub: true,
        // markers: true
      }
    });



    gsap.set(".sc-new .black-area .subtitle .subtitle-seco", {
      "transform": "translateX(5%)",
    });

    gsap.to(".sc-new .black-area .subtitle .subtitle-seco", {
      "transform": "translateX(-13%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".sc-new .subtitle div",
        containerAnimation: asdas22,
        start: "0% 60%",
        end: "100% 60%",
        scrub: true,
      }
    }, 'black');

    gsap.to(".sc-new .area-block .block-group-line-1", {
      "transform": "translateX(-40%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".sc-new .first-block",
        containerAnimation: asdas22,
        start: "0% 60%",
        end: "100% 60%",
        scrub: true,
      }
    }, 'black');

    gsap.to(".sc-new .area-block .block-group-line-2", {
      "transform": "translateX(-10%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".sc-new .first-block",
        containerAnimation: asdas22,
        start: "0% 60%",
        end: "100% 60%",
        scrub: true,
      }
    }, 'black');

    gsap.to(".sc-new .area-block .block-group-line-3", {
      "transform": "translateX(-20%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".sc-new .first-block",
        containerAnimation: asdas22,
        start: "0% 60%",
        end: "100% 60%",
        scrub: true,
      }
    }, 'black');


    gsap.to(".sc-new .white-area .subtitle .subtitle-seco", {
      "transform": "translateY(-10%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".sc-new .subtitle div",
        containerAnimation: asdas22,
        start: "0% 60%",
        end: "100% 60%",
        scrub: true,
      }
    });
  



  const maker = gsap.timeline({
    scrollTrigger:{
      trigger: ".sc-new .white-area",
      start:"0% 50%",
      end:"0% 50%",
      scrub:1,
      containerAnimation: asdas22,
    }
  })
  maker.to(".sc-new .marker img", {
    "filter" : 'invert(100%)'
  }, 'marker');
  maker.to(".sc-new .marker .line", {
    'background' : '#000'
  }, 'marker');


  const newVd = gsap.timeline({
    scrollTrigger:{
      trigger: ".sc-new .new-video-area",
      start:"100% 50%",
      end:"100% 100%",
      // markers: true,
      scrub:1,
      containerAnimation: asdas22,
    }
  })
  newVd.set('.sc-new .new-video-area', {
    width:'100vw',
     height:'100vh' 
  },'vd')
  newVd.to('.sc-new .new-video-area .content',{
    width: "100vh",
    height: "100%",
  },'vd')



 






   



















    // --------------- Never miss --------------- 
    // 텍스트 효과
    const nmtxl = gsap.timeline({
      scrollTrigger : {
        trigger: '.sc-never',
        start:"10% 90%",        
        end:"100% 90%",      
      },
    });
    nmtxl.from('.sc-never .hi-title .hero-line span', 1.8, {
      y: 100,
      ease: "power4.out",
      skewY: 7,
      yPercent:100,
      stagger: {
        amount: 1
      }
    })

    const nmtxls = gsap.timeline({
      scrollTrigger : {
        trigger: '.sc-never .hi-title',
        start:"30% 80%",        
        end:"100% 90%",      
      },
    });
    nmtxls.from('.sc-never .hi-desc .hero-line div', 1.8, {
      y: 100,
      ease: "power4.out",
      skewY: 7,
      yPercent:100,
      stagger: {
        amount: 1
      }
    }, 'sub-line')

    nmtxls.from('.sc-never .hi-text .hi-stat .hero-line div', 1.8, {
      y: 100,
      ease: "power4.out",
      skewY: 7,
      yPercent:100,
      stagger: {
        amount: 1
      }
    }, 'sub-line')


    // 아이콘
    gsap.to(".picto-ico", { duration: 2, rotate: 360});








    
    // --------------- Drop us --------------- 
    // 텍스트 효과
    const dutxl = gsap.timeline({
      scrollTrigger : {
        trigger: '.sc-drop',
        start:"10% 90%",        
        end:"100% 90%",        
        // markers: true,
      },
    });
    dutxl.from('.sc-drop .hero-line span', 2, {
      y: 100,
      ease: "power4.out",
      skewY: 7,
      yPercent:100,
      stagger: {
        amount: 1
      }
    })









   



  })