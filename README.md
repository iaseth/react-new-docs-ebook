
# `react-new-docs-ebook`
A `python` script to download [new React docs](https://beta.reactjs.org/) and export it as an `EPUB` ebook.





## Download Ebook
* **AZW3** for Kindle:

	+ [Google Drive](https://drive.google.com/file/d/1XeUoDJs47pd87Dz8xAJeysGWim6_b_D-/view?usp=share_link)

* **EPUB** for others:

	+ [Google Drive](https://drive.google.com/file/d/1sP2SlvodoWlWpWYRTsankluJW2eOmCNd/view?usp=share_link)





## Steps to produce EPUB
* Step 1 (optional): Producing `pages.json`

	```
	python download_index.py
	```

* Step 2: Downloading HTMLs for each page

	```
	python download_htmls.py
	```

* Step 3: Generating EPUB

	```
	python generate_ebook.py
	```

* Step 4: Exporting to Kindle

	```
	// you need to have calibre installed for running ebook-convert
	ebook-convert react-beta-docs.epub react-beta-docs.azw3
	```

