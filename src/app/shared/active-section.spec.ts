import { activeSectionId } from './active-section';

describe('activeSectionId', () => {
  const cutoff = 200;

  it('returns null with no sections', () => {
    expect(activeSectionId([], cutoff)).toBeNull();
  });

  it('falls back to the first section when all of them are below the cutoff', () => {
    const tops = [
      { id: 'about', top: 500 },
      { id: 'experience', top: 900 },
    ];
    expect(activeSectionId(tops, cutoff)).toBe('about');
  });

  it('picks the last section whose top has passed the cutoff', () => {
    const tops = [
      { id: 'about', top: -800 },
      { id: 'experience', top: -200 },
      { id: 'projects', top: 600 },
    ];
    expect(activeSectionId(tops, cutoff)).toBe('experience');
  });

  it('treats a section sitting exactly on the cutoff as active', () => {
    const tops = [
      { id: 'about', top: -100 },
      { id: 'experience', top: cutoff },
    ];
    expect(activeSectionId(tops, cutoff)).toBe('experience');
  });

  it('stays on a tall section scrolled far past the cutoff', () => {
    // The case the IntersectionObserver alone would get wrong: nothing crosses a
    // threshold for thousands of pixels while a long section fills the viewport.
    const tops = [
      { id: 'skills', top: -300 },
      { id: 'projects', top: -2500 },
    ];
    expect(activeSectionId(tops, cutoff)).toBe('projects');
  });

  it('reaches the final section at the bottom of the page', () => {
    const tops = [
      { id: 'about', top: -4000 },
      { id: 'projects', top: -1200 },
    ];
    expect(activeSectionId(tops, cutoff)).toBe('projects');
  });
});
