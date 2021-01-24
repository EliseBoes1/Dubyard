'use strict'

const allFilters = Array.from(document.getElementById('filter-recipes').getElementsByTagName('li'));

const selectedType = Array.from(document.getElementById('filter-type').getElementsByTagName('li'));
const selectedEdition = Array.from(document.getElementById('filter-edition').getElementsByTagName('li'));
const selectedTime = Array.from(document.getElementById('filter-time').getElementsByTagName('li'));

const selectedFilters = {
    edition: '',
    time: ''
}

let results;

const addSelected = (selectedType, value) => {
    selectedFilters[selectedType] = value;
}

const capitalize = word => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }

const evalSelected = element => {
    element.addEventListener('click', function () {
        Array.from(document.getElementsByClassName('reg-post')).forEach(post => {
            post.style.display = "none";
        });
        const valueToFilter = this.innerHTML.split(' ')[0];
        console.log(valueToFilter);
        Array.from(
            document.getElementsByClassName(valueToFilter)).forEach(post => {
            post.style.display = "block";
        });
        toggleSelected(element);

        const type = element.parentElement.id.split('-').pop();
        addSelected(type, valueToFilter);
    });
}

const toggleSelected = element => {
    const siblings = Array.from(element.parentElement.children);
    siblings.forEach(sibling => {
        sibling.classList -= 'selected';
    });
    element.classList.toggle('selected');
}

selectedType.forEach(type => {
    evalSelected(type);
});

selectedEdition.forEach(type => {
    evalSelected(type);
});

selectedTime.forEach(type => {
    evalSelected(type);
});