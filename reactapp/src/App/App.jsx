import React from 'react';

import './App.scss';
import ebook from '../ebook.json';

import Header from './Header';
import Footer from './Footer';



function Page ({page, k}) {
	return (
		<div className="py-1">
			<h6>
				<span>Page # {k+1}</span>
				<span className="px-1">&bull;</span>
				<span>{(page.size/1000).toFixed(1)} kB</span>
			</h6>
			<h4 className="text-red-600">{page.title}</h4>
			<h6>
				<a href={page.URL} className="text-blue-800">@docs{page.path}</a>
			</h6>
		</div>
	);
}

function Section ({section, k}) {
	const [expanded, setExpanded] = React.useState(false);
	const toggle = () => setExpanded(x => !x);

	const pageItems = section.pages.map((page, k) => <Page key={k} {...{page, k}} />);

	return (
		<section className="bg-white border-b-2 border-zinc-200">
			<header className="px-4 py-4 cursor-pointer" onClick={toggle}>
				<h5>
					<span>Section # {k+1}</span>
					<span className="px-1">&bull;</span>
					<span>{section.pages.length} pages</span>
					<span className="px-1">&bull;</span>
					<span>{(section.size/1000).toFixed(1)} kB</span>
				</h5>
				<h2 className="text-red-800">{section.title}</h2>
				<h5>
					<a href={section.URL} className="text-blue-800">@docs{section.path}</a>
				</h5>
			</header>

			{expanded && <main className="pl-8 pr-4 pb-4">{pageItems}</main>}
		</section>
	);
}

function App () {
	const {sections} = ebook;
	const sectionItems = sections.map((section, k) => <Section key={k} {...{section, k}} />);

	return (
		<div className="">
			<Header />

			<main className="bg-slate-200 text-slate-800">
				<article className="max-w-md mx-auto">
					<div>{sectionItems}</div>
				</article>
			</main>

			<Footer />
		</div>
	);
}

export default App;
