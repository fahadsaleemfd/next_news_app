import {Toolbar} from '../components/toolbar'
import styles from '../styles/Feed.module.css';
import matter from 'gray-matter'
import Link from "next/link";
var slugify = require('slugify')


const Blog  = ({data}) => {
        
        const RealData = data.map((blog) => matter(blog))
        const ListItems = RealData.map((listItem) => listItem.data)
       
  
        return (
            <div className='page-container'>
                <Toolbar/>
                <div className={styles.main}>
                    {ListItems.map((article,index)=>(
                        <div key={index} className={styles.post}>
                             <Link href={'blog/'+slugify(article.title,{lower: true})}>
                               <h1>{article.title}</h1>
                              </Link>
                             <p>{article.description.substring(0,100)}...</p>
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
