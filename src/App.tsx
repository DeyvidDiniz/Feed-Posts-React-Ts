

import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

import style from './App.module.css'
import './global.css'


const posts = [
  {
    id:1,
    author:{
      avatarUrl: 'https://pps.whatsapp.net/v/t61.24694-24/328738145_1070209000572743_5106852784226137364_n.jpg?ccb=11-4&oh=01_AdTawtOfNtVbxf5gvn-R7c2_SZRcT5QoCB65GcTIAjFxLQ&oe=641458E2',
      name: 'Camilly',
      role: 'Leitora'
    },
    content:'oi gente sou a Camilly e shipooo muitoooo, o  Deyvid com a Jude, casal perfeito',
    publishedAt:new Date('2023-03-01 20:00:00')
  },

  {
    id:2,
    author:{
      avatarUrl: 'data:image/jpeg;base64,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',
      name: 'Jude',
      role: ''
    },
    content:'Te amo Deyvid',
    publishedAt:new Date('2023-03-05 20:00:00')
  }
];

function App() {

  return (
    <div className={style.container}>
      <Sidebar/>

      <div>
        {posts.map(post => {
          return (
            <Post 
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          )
        })}
      </div>

    </div>
    
  )
}

export default App
