import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import style from './Post.module.css'

interface Author{
    name:string;
    role:string;
    avatarUrl:string;
}

interface PostProps{
    author:Author;
    publishedAt:Date;
    content:string;
}

export function Post({author, publishedAt, content}: PostProps){

    const [comments, setComments] = useState([
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    ])

    const [newCommentText, setNewCommentText] = useState('')
    

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    } )

    const publisedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();
        
        setComments([...comments, newCommentText ])
        setNewCommentText('');

    }

    function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Campo Obrigatório')
    }



    function deleteComment(commentToDelete:string){
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete;
        })

        setComments(commentsWithoutDeletedOne);
    }


    const isNewCommentEmpty = newCommentText.length == 0;

    return(
        <article className={style.post}>
            <header>
                <div className={style.profile}>
                    <Avatar 
                        src={author.avatarUrl}
                    />

                    <div className={style.profileInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time>{publisedDateRelativeToNow}</time>
            </header>

            <div className={style.content}>
                <p>{content}</p>
            </div>

            
            <footer>
                <form onSubmit={handleCreateNewComment}>
                    <strong>Deixe seu feedback</strong>
                    
                    <textarea 
                        name="comment"
                        placeholder='Deixe seu comentário'
                        value={newCommentText}
                        onChange={handleNewCommentChange}
                        onInvalid={handleNewCommentInvalid}
                        required
                    />

                    <div className={style.btnPublicar}>
                        <button type="submit" disabled={isNewCommentEmpty} >
                            Publicar
                        </button>
                    </div>
                </form>
            </footer>

            

            {comments.map( comment =>{
                return (
                    <Comment 
                        key={comment} 
                        content={comment} 
                        onDeleteComment={deleteComment}
                    />
                )
            })}


        </article>
    )

}