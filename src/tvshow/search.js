import tvShows from './tvShows.json';

export default function searchTvShows(answers, input) {
  return Promise.resolve(
    tvShows.tvShows.filter(tvShow => new RegExp(input, 'i').exec(tvShow) !== null),
  );
}
