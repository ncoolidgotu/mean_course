import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs'; //Event emmiter for broad usage
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>(); //Pass list of posts to event emmitter

    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }))
        .subscribe((transformedPosts) => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        })
    }

    getPostsUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPosts(title: string, content: string) {
        const post: Post = {id: null, title: title, content: content};
        this.http.post<{message: string, postID: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            const id = responseData.postID
            post.id = id;
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]); //Pushes the array captured in the Subject event emmitter
        });
    }

    deletePost(postID: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postID)
        .subscribe(() => {
            console.log('Deleted!');
            const updatedPosts = this.posts.filter(post => post.id !== postID);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    };
}