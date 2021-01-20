import {Toolbar} from '../components/toolbar'
import styles from '../styles/Feed.module.css';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const Blog  = ({posts}) => {

        const RealData = posts.map((data) => matter(data))
       
        return (
            <div className='page-container'>
                <Toolbar/>
                <div className={styles.main}>
                    {RealData.map((article,index)=>(
                        <div key={index} className={styles.post}>
                            <h1>{RealData.[index].data.title}</h1>
                            <p>{RealData.[index].data.description}</p>
                            {!!RealData.[index].data.image && <img src={RealData.[index].data.image} />}
                        </div>
                    ))}
                </div>

        
        </div>
    )
  }


  export async function getStaticProps() {
    
    const postsDirectory = path.join(process.cwd(), 'pages/posts')
    const filenames = fs.readdirSync(postsDirectory)
    const posts = filenames.map((filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
    
        // Generally you would parse/transform the contents
        // For example you can transform markdown to HTML here
    
        return {
          filename,
          content: fileContents,
        }
      })

     return {
    props: {
      posts,
    },
  }
    // Get external data from the file system, API, DB, etc.
    // const data = ...
  
    // // The value of the `props` key will be
    // //  passed to the `Home` component
    // return {
    //   props: ...
    // }
  }

  export default Blog
