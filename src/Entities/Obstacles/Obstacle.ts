/**
 * An obstacle that appears on the mountain. Randomly created as one of the types defined in the OBSTACLE_TYPES array.
 */

import { COLLISION_OUTCOME, IMAGE_NAMES } from "../../Constants";
import { Canvas } from "../../Core/Canvas";
import { ImageManager } from "../../Core/ImageManager";
import { randomInt } from '../../Core/Utils';
import { Entity } from "../Entity";

/**
 * tuple that defines the image name, airborne collision outcome and normal collision outcome respectively
 */
type iObstacleType = [IMAGE_NAMES, COLLISION_OUTCOME?, COLLISION_OUTCOME?];

/**
 * The different types of obstacles that can be placed in the game.
 */
const OBSTACLE_TYPES: iObstacleType[] = [
    [IMAGE_NAMES.TREE],
    [IMAGE_NAMES.TREE_CLUSTER],
    [IMAGE_NAMES.ROCK1, COLLISION_OUTCOME.IGNORE],
    [IMAGE_NAMES.ROCK2, COLLISION_OUTCOME.IGNORE],
    [IMAGE_NAMES.JUMP_RAMP, COLLISION_OUTCOME.IGNORE, COLLISION_OUTCOME.JUMP],
];

export class Obstacle extends Entity {
    /**
     * The name of the current image being displayed for the obstacle.
     */
    imageName: IMAGE_NAMES;
    /**
     * What happens when the skier collides while airborne. defaults to crash
     */
    onAirborneCollision: COLLISION_OUTCOME;
    /**
     * What happens when the skier collides while grounded. defaults to crash
     */
    onCollision: COLLISION_OUTCOME;

    /**
     * Initialize an obstacle and make it a random type.
     */
    constructor(x: number, y: number, imageManager: ImageManager, canvas: Canvas) {
        super(x, y, imageManager, canvas);

        const typeIdx = randomInt(0, OBSTACLE_TYPES.length - 1);
        const [imageName, onAirborneCollision, onCollision] = OBSTACLE_TYPES[typeIdx];
        this.imageName = imageName;
        this.onAirborneCollision = onAirborneCollision || COLLISION_OUTCOME.CRASH;
        this.onCollision = onCollision || COLLISION_OUTCOME.CRASH;
    }

    /**
     * Obstacles can't be destroyed
     */
    die() {

    }
}