import pencilImage from '../examples/images/pencil.svg'
import alcoholImage from '../examples/images/alcohol.svg'
import emotionsImage from '../examples/images/emotions.svg'
// export const exampleImages = import.meta.glob("../examples/images/")
export const exampleWorkspaces = import.meta.glob("./workspaces/*.json")


export const examplesInfo = [
  {
    name: 'pencils',
    image: pencilImage,
    workspace: './workspaces/pencil.json',
  },
  {
    name: 'alcohol',
    image: alcoholImage,
    workspace: './workspaces/alcohol.json',
  },
  {
    name: 'emotions',
    image: emotionsImage,
    workspace: './workspaces/emotions.json',
  },
]