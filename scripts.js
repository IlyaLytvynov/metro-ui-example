(function () {
  class MetroUi {
    /**
     * @param {object} options
     * @param {string} options.selector
     * */
    constructor(options) {
      this.root = document.querySelector(options.selector);
      this.containers =  Array.prototype.slice.call(this.root.querySelectorAll('.flex-container',0));
      this.attachEvents();
      this.fitContainersHeight();
    }

    fitContainersHeight() {
      this.containers.forEach((container) => {
        const containerHeight = container.getBoundingClientRect().height;
        const childCells =Array.prototype.slice.call(container.querySelectorAll('[class*="cell"]',0));
        const childHeight = this.calcChildHeight(childCells);

        if (containerHeight > childHeight) {
          childCells.forEach((child)=> child.classList.add('flex-grow'));
        }
      });
    }

    calcChildHeight(childCells) {
      const initialHeight = 0;
      return childCells.reduce((totalHeight, cell)=>{
        const cellClientHeight = cell.getBoundingClientRect().height;
        return initialHeight+cellClientHeight;
      }, initialHeight);
    }

    attachEvents() {
      window.addEventListener('resize', () => {
        this.fitContainersHeight();
      });
    }
  }


  const ui = new MetroUi({selector:'.page-wrapper'});
})();