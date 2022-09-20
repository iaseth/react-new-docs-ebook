import json

import requests
import bs4


def sanitize_string(s):
	s = list(s)
	for idx, c in enumerate(s):
		if not c.isalnum():
			s[idx] = '_'
	return ''.join(s)

def main():
	parts = [
		{"title": "Home", "url": "https://beta.reactjs.org"},
		{"title": "Learn", "url": "https://beta.reactjs.org/learn"},
		{"title": "API", "url": "https://beta.reactjs.org/apis/react"}
	]

	for pidx, part in enumerate(parts):
		print(f"Creawling part [{pidx+1}/{len(parts)}]:")
		print(f"\t-- downloading ({part['url']})")
		response = requests.get(part['url'])
		soup = bs4.BeautifulSoup(response.text, 'lxml')

		nav = soup.find('nav', attrs={'role': 'navigation'})
		part['sections'] = []
		for sidx, section_li_tag in enumerate(nav.find('ul').find_all('li', recursive=False)):
			section_a_tag = section_li_tag.find('a')
			section = {
				"title": section_a_tag.text,
				"url": section_a_tag['href'],
				"filename": sanitize_string(section_a_tag['href']),
				"pages": []
			}
			part["sections"].append(section)

			page_list = section_li_tag.find('ul')
			if not page_list: continue
			for idx, page_li_tag in enumerate(page_list.find_all('li', recursive=False)):
				page_a_tag = page_li_tag.find('a')
				page = {
					"title": page_a_tag.text,
					"url": page_a_tag['href'],
					"filename": sanitize_string(page_a_tag['href']),
				}
				section['pages'].append(page)

			print(f"\t-- added {len(section['pages'])} pages to section '{section['title']}'")

	jo = {"parts": parts}
	output_json_name = 'pages.json'
	with open(output_json_name, 'w') as f:
		json.dump(jo, f, indent='\t')
		print(f"saved: ({output_json_name})")



if __name__ == '__main__':
	main()
