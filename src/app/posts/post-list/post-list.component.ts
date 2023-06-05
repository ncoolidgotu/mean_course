import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { Subscription } from "rxjs";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

    //Properties
    posts: Post[] = [];
    private postsSub: Subscription;

    //Services
    constructor(public postsService: PostsService) {}

    //Methods
    ngOnInit(): void {
        this.postsService.getPosts()
        this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }

    onDelete(postID: string) {
        this.postsService.deletePost(postID);
    }

    ngOnDestroy(): void {
        this.postsSub.unsubscribe();
    }
}