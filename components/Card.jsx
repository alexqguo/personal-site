import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  href,
  title,
  repoLink,
  description,
}) => (
  <div className="inline-block p-2 w-full">
    <div className="bg-white rounded-md border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <a
        href={href}
        target="_blank"
        className=""
      >
        <div className="px-6 py-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <div className="text-sm text-gray-700 dark:text-gray-400">{href}</div>
          <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
        </div>
      </a>
    </div>
    <span className="text-xs italic text-gray-700 dark:text-gray-400">
      Repo: <a href={repoLink} target="_blank">{repoLink}</a>
    </span>
  </div>
);

Card.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  repoLink: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;