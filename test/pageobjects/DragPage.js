import BasePage from './BasePage';

class DragPage extends BasePage {
    selectors = {
        elementsToDrag: [
            '//android.view.ViewGroup[@content-desc="drag-l2"]/android.widget.ImageView',
            '//android.view.ViewGroup[@content-desc="drag-r3"]/android.widget.ImageView',
            '//android.view.ViewGroup[@content-desc="drag-r1"]/android.widget.ImageView',
            '//android.view.ViewGroup[@content-desc="drag-c1"]/android.widget.ImageView',
            '//android.view.ViewGroup[@content-desc="drag-c3"]/android.widget.ImageView',
            '//android.view.ViewGroup[@content-desc="drag-r2"]/android.widget.ImageView',
            '//android.view.ViewGroup[@content-desc="drag-c2"]/android.widget.ImageView',
            '//android.view.ViewGroup[@content-desc="drag-l1"]/android.widget.ImageView',
            '//android.view.ViewGroup[@content-desc="drag-l3"]/android.widget.ImageView'
        ],
        targetElements: [
            '//android.view.ViewGroup[@content-desc="drop-l2"]/android.view.ViewGroup',
            '//android.view.ViewGroup[@content-desc="drop-r3"]/android.view.ViewGroup',
            '//android.view.ViewGroup[@content-desc="drop-r1"]/android.view.ViewGroup',
            '//android.view.ViewGroup[@content-desc="drop-c1"]/android.view.ViewGroup',
            '//android.view.ViewGroup[@content-desc="drop-c3"]/android.view.ViewGroup',
            '//android.view.ViewGroup[@content-desc="drop-r2"]/android.view.ViewGroup',
            '//android.view.ViewGroup[@content-desc="drop-c2"]/android.view.ViewGroup',
            '//android.view.ViewGroup[@content-desc="drop-l1"]/android.view.ViewGroup',
            '//android.view.ViewGroup[@content-desc="drop-l3"]/android.view.ViewGroup'
        ],
        conratulationsText: '//android.view.ViewGroup[@content-desc="Drag-drop-screen"]/android.view.ViewGroup[1]/android.view.ViewGroup[1]',
        retryButton: '//android.view.ViewGroup[@content-desc="button-Retry"]/android.view.ViewGroup',
    };

    // Метод для выполнения drag-and-drop для всех элементов
    async performAllDragAndDrops() {
        const { elementsToDrag, targetElements } = this.selectors;

        for (let i = 0; i < elementsToDrag.length; i++) {
            const dragElement = await $(elementsToDrag[i]);
            const dropElement = await $(targetElements[i]);

            // Проверяем, что элементы отображаются
            await expect(dragElement).toBeDisplayed();
            await expect(dropElement).toBeDisplayed();

            // Выполняем drag-and-drop
            await dragElement.dragAndDrop(dropElement);
        }
    }

    async verifyElementsVisibility() {
        await expect(await $(this.selectors.conratulationsText)).toBeDisplayed();
        await expect(await $(this.selectors.retryButton)).toBeDisplayed();
    }


}

export default DragPage;
