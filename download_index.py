import json



def sanitize_string(s):
	s = list(s)
	for idx, c in enumerate(s):
		if not c.isalnum():
			s[idx] = '_'
	return ''.join(s)

def get_route_object(route):
	path = route["path"]
	route_object = {
		"filename": sanitize_string("path"),
		"path": path,
		"title": route["title"],
		"URL": f"https://beta.reactjs.org{path}",
	}
	return route_object

def main():
	learn_json = json.load(open("data/sidebarLearn.json"))
	reference_json = json.load(open("data/sidebarReference.json"))
	routes = learn_json["routes"][0]["routes"] + reference_json["routes"][0]["routes"]

	sections = []
	section = None
	for route in routes:
		if "hasSectionHeader" in route:
			section = {
				"sectionHeader": route["sectionHeader"],
				"chapters": []
			}
			sections.append(section)
		else:
			chapter = get_route_object(route)
			chapter["pages"] = []
			section["chapters"].append(chapter)
			for page_route in route["routes"]:
				page = get_route_object(page_route)
				chapter["pages"].append(page)

	jo = {}
	jo["sections"] = sections
	output_json_name = 'pages.json'
	with open(output_json_name, 'w') as f:
		json.dump(jo, f, indent='\t')
		print(f"saved: ({output_json_name})")



if __name__ == '__main__':
	main()
