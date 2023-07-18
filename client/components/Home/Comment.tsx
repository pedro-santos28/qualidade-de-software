import { useState } from 'react';
import { useUserContext } from '../../contexts/context';
import axiosClient from '../../config/api';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from 'antd';
import {
  ArrowBendDoubleUpRight,
  FloppyDisk,
  Trash,
} from '@phosphor-icons/react';

type CommentProps = {
  comment: models.IComment;
  mutate: () => void;
};

const Comment = ({ comment, mutate }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { session } = useUserContext();

  const confirmDeleteComment = async (commentId: string) => {
    try {
      const res = await axiosClient.delete(`/comments/${commentId}`);
      console.log(res.status);
      if (res.status === 204) {
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteComment = () => {
    setIsDeleting(!isDeleting);
  };

  const handleSaveComment = async () => {
    const payload = {
      content: commentText,
    };
    try {
      const res = await axiosClient.put(`/comments/${comment.id}`, payload);
      if (res.status === 200) {
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

  return (
    <div>
      <div
        key={comment.id}
        className="bg-white p-4 mb-4 shadow rounded-lg flex flex-col justify-between"
      >
        <h3 className="text-gray-500">{comment.user.username}</h3>
        <div className="flex justify-between items-center mb-2">
          {isEditing ? (
            <input
              type="text"
              value={commentText}
              className="rounded"
              onChange={(e) => setCommentText(e.target.value)}
            />
          ) : (
            <p>
              {' '}
              <span className="text-green-800">comentou:</span>{' '}
              {comment.content}{' '}
            </p>
          )}

          {comment.userId === session?.user?.id && (
            <div className="flex flex-col gap-2 items-center">
              {isDeleting ? (
                <div className="flex gap-2">
                  <button
                    className="text-green-500 hover:font-bold"
                    onClick={() => confirmDeleteComment(comment.id)}
                  >
                    <Trash color="red" size={32} />
                  </button>

                  <button className="hover:cursor-pointer">
                    <ArrowBendDoubleUpRight
                      onClick={handleDeleteComment}
                      size={32}
                      color="#ffea00"
                    />
                  </button>
                </div>
              ) : (
                <Button
                  type="primary"
                  danger
                  onClick={handleDeleteComment}
                  style={{ fontWeight: 'bold' }}
                >
                  Excluir
                </Button>
              )}

              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    className="text-green-500 hover:font-bold disabled:cursor-not-allowed "
                    onClick={handleSaveComment}
                    disabled={!commentText}
                  >
                    <FloppyDisk color="green" size={32} />
                  </button>

                  <button className="hover:cursor-pointer">
                    <ArrowBendDoubleUpRight
                      onClick={handleEditComment}
                      size={32}
                      color="#ffea00"
                    />
                  </button>
                </div>
              ) : (
                <Button
                  type="primary"
                  onClick={handleEditComment}
                  style={{ backgroundColor: '#dac238', fontWeight: 'bold' }}
                >
                  Editar
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="text-gray-500 text-xs">
          Enviado á {''}
          {formatDistance(new Date(comment.createdAt), new Date(), {
            locale: ptBR,
          })}{' '}
          atrás
        </div>
      </div>
    </div>
  );
};

export default Comment;
