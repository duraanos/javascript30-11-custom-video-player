'use strict';

const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const ranges = document.querySelectorAll('.player__slider');

const btnToggle = document.querySelector('.player__button');
const btnSkips = document.querySelectorAll('[data-skip]');

const togglePlay = function () {
  return video.paused || video.ended ? video.play() : video.pause();
};

const updateToggleBtn = function () {
  btnToggle.innerHTML = video.paused ? '►' : '❚❚';
};

const handleRangesUpdate = function () {
  video[this.name] = this.value;
};

const handleProgress = function () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = function (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const handleSkip = function () {
  video.currentTime += +this.dataset.skip;
};

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleBtn);
video.addEventListener('pause', updateToggleBtn);
video.addEventListener('timeupdate', handleProgress);

btnSkips.forEach(btn => btn.addEventListener('click', handleSkip));
btnToggle.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('change', handleRangesUpdate));
ranges.forEach(range =>
  range.addEventListener('mousemove', handleRangesUpdate)
);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
