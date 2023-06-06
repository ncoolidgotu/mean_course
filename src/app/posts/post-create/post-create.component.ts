import { Component, EventEmitter, OnInit, Output } from '@angular/core'

import { Post } from '../post.model'

import { NgForm } from '@angular/forms'
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-post-create', //always start with 'app-'
    templateUrl: './post-create.component.html', //HTML template
    styleUrls: ['./post-create.component.css']

}) //Angular component decorator
export class PostCreateComponent implements OnInit {
    enteredContent = '';
    enteredTitle = '';
    post: Post;
    isLoading = false;
    private mode = 'create';
    private postID: string;

    //@Output() postCreated = new EventEmitter<Post>();

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postID')){
                this.mode = 'edit';
                this.postID = paramMap.get('postID');
                this.isLoading = true;
                console.log(this.postID);
                this.postsService.getPost(this.postID).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id: postData._id, title: postData.title, content: postData.content}
                });
            } else {
                this.mode = 'create';
                console.log("hi");
                this.postID = 'null'
            }
        });
    }

    //onAddPost(postInput: HTMLTextAreaElement) { //The input type is a text area

    onSavePost(form: NgForm) { //The input type is a text area
        if (form.invalid){
            return;
        }
        this.isLoading = true;
        if (this.mode === "create"){
            this.postsService.addPosts(form.value.title, form.value.content);
        } else {
            this.postsService.updatePost(this.postID, form.value.title, form.value.content);
        }
        const post: Post = {
            id: null,
            title: form.value.title,
            content: form.value.content
        };
        form.resetForm()
    }


}