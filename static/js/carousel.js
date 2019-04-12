let body = document.querySelector('body');

if(body) {
    body.classList.remove('js-enabled');
}


let carousels = document.getElementsByClassName('image-carousel');

    [].forEach.call(carousels, function (c) {
        let next = c.getElementsByClassName('next')[0],
            prev = c.getElementsByClassName('prev')[0],
            bubblesContainer = c.getElementsByClassName('bubbles')[0],
            inner =  c.getElementsByClassName('inner')[0],
            imgs = inner.getElementsByClassName('carousel-img'),
            currentImageIndex = 0,
            width = 19.3,
            bubbles = [];
        
        for (let i =0; i < imgs.length; i++) {
            let b = document.createElement('span');
            b.classList.add('bubble');
            bubblesContainer.appendChild(b);
            bubbles.push(b);
            console.log(bubblesContainer);

            b.addEventListener('click', function () {
                currentImageIndex = i;
                switchImg();
            })
        }
        //voeg elke keer een image toe door width op te tellen
        function switchImg () {
            inner.style.left = -width * currentImageIndex + 'em';
            
            //voor elke image die er zijn, geef de bijbehorende bubble de class active
            bubbles.forEach(function (b, i) {
                if (i === currentImageIndex) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            })
        }

        next.addEventListener('click', function () {
                currentImageIndex++;
                       
            if(currentImageIndex >= imgs.length) {
                currentImageIndex = 0;
            }
            switchImg();

        })

        prev.addEventListener('click', function () {
            currentImageIndex--;

            if(currentImageIndex < 0) {
                currentImageIndex = imgs.length -1;
            }
            switchImg();
        });

        switchImg();
    });


    // Bronnen:
    // https://stackoverflow.com/questions/36570974/responsive-carousel-issue/36571670
    // https://stackoverflow.com/questions/42262810/trying-to-code-a-simple-carousel
    // https://codereview.stackexchange.com/questions/187088/javascript-image-carousel
    // https://codereview.stackexchange.com/questions/164192/javascript-jquery-carousel-slider