import { Component, EventEmitter, Output } from '@angular/core'

import { Post } from '../post.model'

import { NgForm } from '@angular/forms'
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-create', //always start with 'app-'
    templateUrl: './post-create.component.html', //HTML template
    styleUrls: ['./post-create.component.css']

}) //Angular component decorator
export class PostCreateComponent {
    enteredContent = '';
    enteredTitle = '';
    //@Output() postCreated = new EventEmitter<Post>();

    constructor(public postsService: PostsService) {}

    //onAddPost(postInput: HTMLTextAreaElement) { //The input type is a text area

    onAddPost(form: NgForm) { //The input type is a text area
        if (form.invalid){
            return;
        }
        const post: Post = {
            id: null,
            title: form.value.title,
            content: form.value.content
        };
        this.postsService.addPosts(form.value.title, form.value.content);
        form.resetForm()
    }
}