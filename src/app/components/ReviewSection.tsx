'use client';

import React, { useState, useRef } from 'react';
import { Star, MessageSquarePlus, ImagePlus, X } from 'lucide-react';
import { Review } from '../profissionais/data';

interface ReviewSectionProps {
  initialReviews: Review[];
  overallRating: number;
  reviewsCount: number;
}

export default function ReviewSection({ initialReviews, overallRating, reviewsCount }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    const availableSlots = 3 - selectedPhotos.length;
    const allowedFiles = files.slice(0, availableSlots);
    
    const newPhotos = allowedFiles.map(file => URL.createObjectURL(file));
    setSelectedPhotos([...selectedPhotos, ...newPhotos]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input
    }
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(selectedPhotos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newReviewObj: Review = {
      id: Date.now().toString(),
      author: newName,
      rating: newRating,
      text: newComment,
      date: new Date().toISOString(),
      photos: selectedPhotos.length > 0 ? selectedPhotos : undefined,
    };

    setReviews([newReviewObj, ...reviews]);
    setIsFormOpen(false);
    setNewName('');
    setNewComment('');
    setNewRating(5);
    setSelectedPhotos([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Avaliações de Clientes</h2>
          <p className="text-neutral-500">O que dizem sobre o trabalho</p>
        </div>
        
        <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-neutral-900">{overallRating.toFixed(1)}</span>
            <div className="flex text-amber-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(overallRating) ? 'fill-current' : 'text-neutral-300'}`} />
              ))}
            </div>
          </div>
          <div className="h-10 w-px bg-neutral-300"></div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-neutral-900">{reviewsCount + (reviews.length - initialReviews.length)}</span>
            <span className="text-xs text-neutral-500 font-medium">avaliações</span>
          </div>
        </div>
      </div>

      {!isFormOpen ? (
        <button 
          onClick={() => setIsFormOpen(true)}
          className="mb-8 flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-neutral-200 rounded-xl text-neutral-600 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-colors font-medium"
        >
          <MessageSquarePlus className="w-5 h-5" />
          Deixar uma avaliação
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mb-8 bg-neutral-50 p-6 rounded-xl border border-neutral-100">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Sua Avaliação</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Nota</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="focus:outline-none"
                >
                  <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Seu Nome</label>
            <input 
              type="text" 
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              placeholder="Digite seu nome"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-neutral-700 mb-1">Comentário</label>
            <textarea 
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none h-24 resize-none"
              placeholder="Conte como foi sua experiência..."
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Fotos do Serviço (opcional, máx 3)</label>
            
            {selectedPhotos.length > 0 && (
              <div className="flex gap-3 mb-3">
                {selectedPhotos.map((photo, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border border-neutral-200">
                    <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedPhotos.length < 3 && (
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <ImagePlus className="w-4 h-4" />
                Adicionar Foto
              </button>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handlePhotoSelect}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button 
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-5 py-2 text-neutral-600 font-medium hover:bg-neutral-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
            >
              Publicar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-neutral-500 text-center py-8">Nenhuma avaliação ainda.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-neutral-100 last:border-0 pb-6 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-neutral-900">{review.author}</h4>
                  <span className="text-xs text-neutral-400">
                    {new Date(review.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-neutral-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 mt-2">{review.text}</p>
              
              {review.photos && review.photos.length > 0 && (
                <div className="flex gap-3 mt-4">
                  {review.photos.map((photo, index) => (
                    <img 
                      key={index}
                      src={photo}
                      alt={`Foto do serviço por ${review.author}`}
                      className="w-24 h-24 rounded-lg object-cover border border-neutral-200 cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
