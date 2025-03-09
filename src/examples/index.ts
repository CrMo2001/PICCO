import pencilImage from '../examples/images/pencil.svg'

// export const exampleImages = import.meta.glob("../examples/images/")
export const exampleWorkspaces = import.meta.glob("./workspaces/*.json")


export const examplesInfo = [
  {
    name: 'pencils',
    image: pencilImage,
    workspace: './workspaces/pencil.json',
  },
]