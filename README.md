# Welcome to Crumb

Crumb is an interacive, node-based diagram creator that enables anyone to create beautiful, animated flow diagrams in minutes.

# Roadmap

- lock width and height when shift key is pressed to maintain aspect ratio
- Ability to set connection end types
- Ability to set animated connection color speed
- look at the # const selectedElements = useStore((store) => store.updateNodeDimensions()); to update the node sizing
- ability to change multiple nodes styles by selecting them
- fix the connecting process because right now the handlers don't show bescause they're turned off when it isn't selected - but they should show if at least one node is selected
- ablity to set border radius individually
- export as png, gif and svg with animation
- support all edge types - https://reactflow.dev/docs/examples/edges/edge-types/
- support multiple edge types -> https://reactflow.dev/docs/examples/edges/markers/
- support simple and advanced floating edges
- support edge labels
- implement fonts, font sizers
- create a custom tooltip component that takes in children and the tooltip as a prop so we can use less code
- implement layering so i can manage z-indexes
- figure out a way to make the text component be highlightable for the text in there and then when im not selected on it, but able to drag it around but have to click on it and let go to be able to edit
