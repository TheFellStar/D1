class Scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }
    preload(){
        this.load.path = './D1/assets/';
        this.load.image('Crest_of_Flames', 'Crest_of_Flames.webp');
        this.load.image('background1', 'Video game adventure.jpg');
        this.load.audio('menu_click', 'Menu Click.wav');
        this.load.audio('menu_song', 'Menu Song.wav');
    }
    create(){

        let menuSong = this.sound.add('menu_song')

        this.imageObject = this.add.image(
            725, //x
            400, //y
            'Crest_of_Flames', //imagename
        )
        this.imageObject.setScale(1) //resize

        this.textObject = this.add.text(
            475, //x
            400, //y
            "A FellStar Studios Production", //text
            {
                font: "40px Secular One",
                color: "#666666",
            } //style
        );

        this.tweens.add({
            targets: this.textObject,
            alpha:{ from: 0, to: 1},
            duration: 3000,
            ease: 'Linear',
            yoyo: true
        });

        this.tweens.add({
            targets: this.imageObject,
            alpha:{ from: 0, to: 1},
            duration: 3000,
            ease: 'Linear',
            yoyo: true
        });

        this.time.delayedCall(6000, () => {
            this.imageObject = this.add.image(
                1700,
                400,
                'background1',
            )
            this.imageObject.setScale(1.6)

            this.tweens.add({
                targets: this.imageObject,
                x: 725,
                y: 400,
                ease: 'Linear',
            })

            this.time.delayedCall(1000, () => {
                this.graphics = this.add.graphics();

                this.graphics.fillStyle(0x000000, 1);
                this.graphics.fillRect(0,0,400, 800);

                menuSong.play();

                this.textObject = this.add.text(
                    100,
                    200,
                    "New Game\n\nLoad Game\n\nOptions\n\nCredits\n\nDownloadable Content\n\nQuit", 
                    {
                        font: "30px Pacifico",
                        color: "#ffffff",
                    }
                )

                this.graphics = this.add.graphics();

                this.graphics.fillStyle(0xffffff, 1); //color, opacity
                this.graphics.fillCircle(80,216,10); //x, y, radius
            })
        })

        this.input.keyboard.once('keydown-ENTER', () => {
            menuSong.stop();
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            let menuClick = this.sound.add('menu_click')
            menuClick.play();
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('scene2')
        })
    }
    update(){}
}

class Scene2 extends Phaser.Scene{
    constructor(){
        super('scene2');
    }
    preload(){
        this.load.path = './D1/assets/';
        this.load.image('background2', 'video game ruins.jpg');
    }
    create(){
        this.cameras.main.setBackgroundColor('#000000')
        let rect1 = this.add.rectangle(-725, 740, 1500, 10, 0xff0000, 1);

        this.tweens.add({
            targets: rect1,
            x:725,
            y:740,
            duration:9000,
            ease: 'Linear',
        })

        this.time.delayedCall(10000, () => {

            this.tweens.add({
                targets: rect1,
                alpha:0,
                duration:1000,
                ease: 'Linear',
            })

            this.time.delayedCall(1000, () => {
                this.textObject = this.add.text(
                    450,
                    200,
                    "There once was peace....\nIn a world nearly devoid of human life,\nwho would've expected another war to break out.",
                    {
                        font: "35px Pacifico",
                        color: "#eeff41",
                    }
                )

                this.tweens.add({
                    targets: this.textObject,
                    alpha:{ from: 0, to: 1},
                    duration: 3000,
                    ease: 'Linear',
                    yoyo: true
                });
            })

            this.time.delayedCall(8000, () => {
                this.imageObject = this.add.image(
                    725,
                    400,
                    'background2',
                )
                this.imageObject.setScale(1.6)

                this.textObject = this.add.text(
                    100,
                    200,
                    "And an already hurt land...",
                    {
                        font: "35px Pacifico",
                        color: "#000000",
                    }
                )
    
                this.cameras.main.fadeIn(1000, 0, 0, 0)

                this.time.delayedCall(3000, () => {
                    let rect2 = this.add.rectangle(725, 375, 1450, 750, 0xff0000, .5)

                    this.tweens.add({
                        targets:this.textObject,
                        alpha:0,
                        duration: 1500,
                        ease: 'Linear',
                    })

                    this.textObject = this.add.text(
                        600,
                        350,
                        "...would Burn anew",
                        {
                            font: "35px Pacifico",
                            color: "#f99000",
                        }
                    )

                    this.tweens.add({
                        targets: this.textObject,
                        alpha:{from: 0, to: 1},
                        duration: 2000,
                        ease: 'Linear',
                    })

                    this.tweens.add({
                        targets: rect2,
                        alpha:{from: 0, to: 1},
                        duration: 2000,
                        ease: 'Linear',
                    })
                })
            })
        })
    }
    update(){}
}

let config = {
    type: Phaser.WEBGL,
    width: 1450,
    height: 750,
    backgroundColor: 0xffffff,
    scene: [Scene1, Scene2],
}

let game = new Phaser.Game(config);
