var el_0 = document.querySelector('#element_0');
var el_1 = document.querySelector('#element_1');
var el_2 = document.querySelector('#element_2');

od = new Odometer({
el: el_0,
value: 0,

// Any option (other than auto and selector) can be passed in here
format: '(ddd)',
theme: 'default'
});

od_1 = new Odometer({
el: el_1,
value: 0,

// Any option (other than auto and selector) can be passed in here
format: '(ddd)',
theme: 'default'
});

od_2 = new Odometer({
el: el_2,
value: 0,

// Any option (other than auto and selector) can be passed in here
format: '(ddd)',
theme: 'default'
});


var observer = new IntersectionObserver(function(entries){

    if(entries[0].isIntersecting){
        setTimeout(function() {
        od.update(1234); // Atualiza o valor do contador para 1234 (será animado)
        od_1.update(1234)
        od_2.update(2345)

        observer.unobserve(el_0)
        }, 1000);


    }
})

observer.observe(el_0)