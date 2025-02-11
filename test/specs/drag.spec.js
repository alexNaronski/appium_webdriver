import DragPage from '../pageobjects/DragPage';

describe('Forms Test', () => {
    let dragPage;

    before(async () => {
        dragPage = new DragPage();
    });

    it('should drag and drop all elements to their targets successfully and verify targets are not visible', async () => {
        // Выполнение drag-and-drop
        await dragPage.navigateToTab('Drag')
        await dragPage.performAllDragAndDrops();
        await dragPage.verifyElementsVisibility()

    });


 


});
