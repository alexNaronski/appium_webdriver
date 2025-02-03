const DIRECTIONS = {
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
};

class Gestures {
    static async checkIfDisplayedWithSwipe({ 
        scrollContainer, 
        searchableElement, 
        maxScrolls, 
        amount = 0, 
        direction = DIRECTIONS.DOWN, 
        percentage = 0.99 
    }) {
        if (!await searchableElement.isDisplayed() && amount <= maxScrolls) {
            let scrollPercentage;
            if (isNaN(percentage) || percentage > 1) {
                scrollPercentage = 0.99;
            } else {
                scrollPercentage = 1 - percentage;
            }

            const { x, y, width, height } = await driver.getElementRect(scrollContainer.elementId);
            const scrollRectangles = {
                top: { x: Math.round(x + width / 2), y: Math.round(y + height * scrollPercentage) },
                right: { x: Math.round(x + width - width * scrollPercentage), y: Math.round(y + height / 2) },
                bottom: { x: Math.round(x + width / 2), y: Math.round(y + height - height * scrollPercentage) },
                left: { x: Math.round(x + width * scrollPercentage), y: Math.round(y + height / 2) },
            };

            if (direction === DIRECTIONS.DOWN) {
                await this.executeGesture({ from: scrollRectangles.top, to: scrollRectangles.bottom });
            } else if (direction === DIRECTIONS.LEFT) {
                await this.executeGesture({ from: scrollRectangles.right, to: scrollRectangles.left });
            } else if (direction === DIRECTIONS.RIGHT) {
                await this.executeGesture({ from: scrollRectangles.left, to: scrollRectangles.right });
            } else if (direction === DIRECTIONS.UP) {
                await this.executeGesture({ from: scrollRectangles.bottom, to: scrollRectangles.top });
            }

            await this.checkIfDisplayedWithSwipe({
                scrollContainer,
                searchableElement,
                maxScrolls,
                amount: amount + 1,
                direction,
                percentage,
            });
        } else if (amount > maxScrolls) {
            throw new Error(`The element '${searchableElement}' could not be found or is not visible.`);
        }
    }

    static async executeGesture({ from, to }) {
        await driver
            .action('pointer')
            .move(from.x, from.y)
            .down()
            .pause(100)
            .move({ duration: 1000, x: to.x, y: to.y })
            .up()
            .perform();

        await driver.pause(1000);
    }
}

export default Gestures;
export { DIRECTIONS };
