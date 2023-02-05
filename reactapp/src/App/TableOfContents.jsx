import React from 'react';



const NodeLink = ({node}) => <a href={node.URL} className="text-blue-700">@docs{node.path}</a>;
const NodeSize = ({node}) => <span>{(node.size/1000).toFixed(1)} kB</span>;

function Page ({page, k}) {
	return (
		<div className="border-l-4 border-red-500 pt-1 pl-3">
			<h6>
				<span>Page # {k+1}</span>
				<span className="px-1">&bull;</span>
				<NodeSize node={page} />
			</h6>
			<h4 className="text-red-600">{page.title}</h4>
			<h6>
				<NodeLink node={page} />
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
			<header className="px-4 py-4 cursor-pointer flex" onClick={toggle}>
				<section className="pr-4 flex">
					<button className={`relative w-5 ch:absolute ch:bg-red-500 ch:h-1 ch:w-full duration-300 ${expanded ? "rotate-45" : ""}`}>
						<h4 className="rotate-90"></h4>
						<h4></h4>
					</button>
				</section>

				<section className="grow">
					<h5>
						<span>Section # {k+1}</span>
						<span className="px-1">&bull;</span>
						<span>{section.pages.length} pages</span>
						<span className="px-1">&bull;</span>
						<NodeSize node={section} />
					</h5>
					<h2 className="text-red-800">{section.title}</h2>
					<h5>
						<NodeLink node={section} />
					</h5>
				</section>
			</header>

			{expanded && <main className="pl-8 pr-4 pb-4 space-y-4">{pageItems}</main>}
		</section>
	);
}

export default function TableOfContents ({ebook}) {
	const {sections} = ebook;
	const sectionItems = sections.map((section, k) => <Section key={k} {...{section, k}} />);

	return (
		<article className="max-w-xl mx-auto">
			<header className="text-center px-4 py-12">
				<h2>Table of Contents</h2>
			</header>

			<main>{sectionItems}</main>
		</article>
	);
}
