import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  useSearchBox,
  useRefinementList,
  useHits,
  Highlight,
} from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch(
  '5PLXYCM29Z',
  '5e7e4436ff3f812c684b5376a255e145'
);

function CustomSearchBox(props) {
  const { query, refine, clear } = useSearchBox(props);

  return (
    <div class="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
      <label
        for="name"
        class="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
      >
        Example Algolia Search with React Hooks &amp; Astro
      </label>
      <input
        type="text"
        name="name"
        id="name"
        class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 outline-none sm:text-sm"
        placeholder="Search"
        value={query}
        onChange={(e) => refine(e.target.value)}
      />
    </div>
  );
}

function CustomRefinementList(props) {
  const { items, refine } = useRefinementList(props);

  return (
    <div className="flex gap-x-4 gap-y-2 flex-wrap py-5">
      {items.map((item) => (
        <span
          className={`inline-flex items-center rounded-full ${
            item.isRefined
              ? 'bg-gray-500 text-white'
              : 'bg-gray-100 text-gray-800'
          } px-2.5 py-0.5 text-xs font-medium whitespace-nowrap cursor-pointer`}
          onClick={() => refine(item.value)}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

function CustomHits(props) {
  const { hits } = useHits(props);

  return hits.length ? (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 mt-5">
      {hits.map((hit) => CustomHit(hit))}
    </div>
  ) : (
    <NoHits />
  );
}

function CustomHit(props) {
  const {
    tag_list,
    featured_image,
    meta: { description },
  } = props;

  return (
    <article className="flex flex-col items-start">
      <a className="group" href="#">
        <div className="relative w-full">
          <img
            src={featured_image.filename}
            alt=""
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] group-hover:opacity-75 transition duration-300"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
        </div>
        <div className="max-w-xl">
          <div className="mt-8 flex items-center gap-x-4 gap-y-2 text-xs flex-wrap">
            {tag_list.map((tag) => (
              <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
          <div className="relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 transition duration-300">
              <span className="absolute inset-0"></span>
              <Highlight attribute="name" hit={props} />
            </h3>
            <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
              <Highlight attribute="meta.description" hit={props} />
            </p>
          </div>
        </div>
      </a>
    </article>
  );
}

function NoHits() {
  return (
    <div className="text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M256 464c114.9 0 208-93.1 208-208s-93.1-208-208-208S48 141.1 48 256c0 17.7 2.2 34.8 6.4 51.2C40.8 317.4 32 333.7 32 352v28C11.6 343.3 0 301 0 256C0 114.6 114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256c-10.6 0-21.1-.6-31.4-1.9c4-5.7 7.3-12 9.8-18.8l10.1-27.7c3.8 .2 7.7 .3 11.6 .3zm43-158.9c-9.9-2-20.5-1.3-30.7 2.5L237.9 319l-65.5-15.4c-8.6-2-13.9-10.6-11.9-19.2s10.6-13.9 19.2-11.9l97.1 22.8c8.2 1.9 15.7 5.3 22.3 9.8zM144.4 192a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-16a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-120-31.2c-20.5-17.6-49.9-20.4-73.4-7l-7.1 4c-7.7 4.4-17.4 1.7-21.8-6s-1.7-17.4 6-21.8l7.1-4c35.2-20.1 79.3-15.9 110.1 10.5l13.2 11.3c6.7 5.8 7.5 15.9 1.7 22.6s-15.9 7.5-22.6 1.7l-13.2-11.3zM112 352v48.4l167.6-62.8c12.4-4.7 26.2 1.6 30.9 14s-1.6 26.2-14 30.9L230.9 407c-.1 .4-.3 .8-.4 1.2l-26.3 72.2c-6.9 19-24.9 31.6-45.1 31.6H112c-26.5 0-48-21.5-48-48V352c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
      </svg>
      <h3 class="mt-2 text-sm font-semibold text-gray-900">No results</h3>
      <p class="mt-1 text-sm text-gray-500">Try a different search!</p>
    </div>
  );
}

function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="Courses">
      <CustomSearchBox />
      <CustomRefinementList attribute="tag_list" />
      <CustomHits />
    </InstantSearch>
  );
}

export default Search;
