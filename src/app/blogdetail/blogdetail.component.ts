import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | undefined;
  relatedBlogs: Blog[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      // Load the selected blog
      this.blogService.getBlogById(blogId).subscribe((b) => {
        this.blog = b;
        if (this.blog) {
          // Load 2 related posts with same 'type'
          this.blogService.getBlogs().subscribe((all) => {
            this.relatedBlogs = all
              .filter((x: { type: any; id: any; }) => x.type === this.blog!.type && x.id !== this.blog!.id)
              .slice(0, 2);
          });
        }
      });
    }
  }
}
