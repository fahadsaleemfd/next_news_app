import {Toolbar} from '../components/toolbar'
import styles from '../styles/Feed.module.css';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const Blog  = ({data}) => {
        
        
        const RealData = data.map((blog) => matter(blog))
        const ListItems = RealData.map((listItem) => listItem.data)
        console.log(ListItems)
  
        return (
            <div className='page-container'>
                <Toolbar/>
                <div className={styles.main}>
                    {ListItems.map((article,index)=>(
                        <div key={index} className={styles.post}>
                             <h1>{article.title}</h1>
                             <p>{article.description}</p>
                            {!!article.image && <img src={article.image} />}
                        </div>
                    ))}
                </div>

        
        </div>
    )
  }


  export async function getStaticProps() {

      const fs = require("fs");
      const files = fs.readdirSync(`${process.cwd()}/pages/posts`, "utf-8");
      const blogs = files.filter((fn) => fn.endsWith(".md"));
      console.log(blogs)

      const data = blogs.map((blog) => {
        const path = `${process.cwd()}/pages/posts/${blog}`;
        const rawContent = fs.readFileSync(path, {
          encoding: "utf-8",
        });

        return rawContent;
      });

      return {
        props: {
          data:data
        },
      };


  }

  export default Blog
