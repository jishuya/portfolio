'use strict';

new TypeIt('.home__title--strong', {
    loop: true,
    speed: 100,
})  // Web Developer|
    .move(-13)
    .type('Amazing ') // Amazing |Web Developer
    .pause(1000)
    .move(null, { to: 'END'}) // Amazing |Web Developer|
    .delete() // |
    .type('Front-end Engineer') //Front-end Engineer|
    .pause(1000)
    .move(-9) //Front-end| Engineer
    .delete(9) //| Engineer
    .type('Back-end') //Back-end| Engineer
    .pause(1000)
    .delete(8) //| Engineer
    .type('Full-stack') //Full-stack| Engineer
    .pause(1000)
    .move(9) //Full-stack Engineer|
    .delete()
.go();