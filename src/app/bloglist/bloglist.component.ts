import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Blog {
  id: string;
  title: string;
  image: string;
  type: string;
  descriptiton: string;
  publishedDate: string;
  blogInfo: {
    carouselImage: string[];
    postBy: string;
    desc: string;
  };
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  selectedYear: number = 2025; // default

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe((allBlogs) => {
      // Filter by year
      const filtered = allBlogs.filter(blog => {
        return new Date(blog.publishedDate).getFullYear() === this.selectedYear;
      });
      this.blogs = filtered;
    });
  }

  onYearClick(year: number): void {
    this.selectedYear = year;
    this.loadBlogs();
  }
}
