
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  githubLink: string;
  viewMoreText: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  imageSrc, 
  githubLink,
  viewMoreText 
}) => {
  return (
    <div className="w-full">
      <div className="overflow-hidden aspect-video mb-2">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h3 className="font-serif font-medium text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <a 
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-medium text-purple hover:text-purple-dark underline"
      >
        {viewMoreText}
      </a>
    </div>
  );
};

export default ProjectCard;
