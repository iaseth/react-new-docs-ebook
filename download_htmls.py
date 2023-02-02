import json
import os

import bs4
import requests


BAD_TAGS = ['button', 'img', 'svg', 'script', 'iframe', 'audio', 'meta', 'figure']


def get_file_size_string(path):
	if os.path.isfile(path):
		s = os.stat(path).st_size
		return f"{round(s/1000, 1)}kB"
	return "0kB"

def clean_soup(soup):
	soup.attrs = {}
	comments = soup.findAll(text=lambda text:isinstance(text, bs4.Comment))
	[comment.extract() for comment in comments]

	appendix = soup.find('div', class_='jPSzpJ')
	if appendix: appendix.decompose()

	styled_container = soup.find('div', class_='eFRJQn')
	if styled_container: styled_container.decompose()

	for tag in soup.find_all():
		if tag.name in BAD_TAGS:
			tag.decompose()
			continue
		elif tag.name in ['a', 'div']:
			tag.attrs = {}
		elif tag.name is None:
			continue
		else:
			tag.attrs = {}

def get_html_from_url(url):
	response = requests.get(url)
	soup = bs4.BeautifulSoup(response.text, 'lxml')
	content = soup.find('article').find('div', recursive=False).find_all('div', recursive=False)[1].find('div', recursive=False)
	clean_soup(content)
	return str(content)

def download_page(page):
	page_url = page['URL']
	html_path = f"data/html/{page['filename']}.html"

	if os.path.isfile(html_path):
		print(f"\t\t---- already downloaded ({html_path}) [{get_file_size_string(html_path)}]")
		return

	print(f"\t\t---- downloading '{page['title']}' ({page_url}) ...")
	html_text = get_html_from_url(page_url)
	with open(html_path, 'w') as f:
		f.write(html_text)
	print(f"\t\t---- saved to ({html_path}) [{get_file_size_string(html_path)}]")

def main():
	json_filename = 'pages.json'
	if not os.path.isfile(json_filename):
		print(f"File NOT found: ({json_filename})")
		return

	jo = json.load(open(json_filename))
	for part in jo['parts']:
		sections = part['sections']
		for sidx, section in enumerate(sections):
			print(f"---- [{sidx+1}/{len(sections)}] New section: '{section['title']}':")
			download_page(section)

			pages = section['pages']
			for pidx, page in enumerate(pages):
				print(f"\t---- [{pidx+1}/{len(pages)}] New page: '{page['title']}':")
				download_page(page)

				# stop after first page
				# break
			# stop after first section
			# break
		# stop after first part
		# break

if __name__ == '__main__':
	main()
