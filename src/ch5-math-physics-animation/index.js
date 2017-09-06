import './vendor/box2dweb/Box2d.min';

const { b2Vec2 } = Box2D.Common.Math;
const { b2BodyDef, b2Body, b2FixtureDef, b2World, b2DebugDraw } = Box2D.Dynamics;
const { b2PolygonShape, b2CircleShape } = Box2D.Collision.Shapes;

export function canvasApp() {
    if (!Modernizr.canvas) {
        return;
    }

    const world = new b2World(new b2Vec2(0, 10), true);
    const scale = 30;
    const walls = [
        // top
        {x: 250 / scale, y: 1 / scale, w: 500/ 2 / scale , h: 1 / scale},
        // bottom
        {x: 250 / scale, y: 499 / scale, w: 500/ 2 / scale, h: 1 / scale},
        // left
        {x: 0, y: 1 / scale, w: 1 / scale, h: 500 / 2 / scale},
        // right
        {x: 500 / scale, y: 250 / scale, w: 1 / scale, h: 500 / 2 / scale},
    ];

    const appElement = document.getElementById('app');
    const appTemplate = 
        `<canvas id="canvasOne" width="500" height="500" style="display: block;">
        Your browser doesn't support HTML5 canvas.
        </canvas>`;

    appElement.innerHTML = appTemplate;

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext("2d");
}
