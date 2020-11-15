import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Parent extends Vue {
    clicked() {
        console.log('click from parent')
    }
    parentClicked() {
        console.log('parent clicked');
    }
}