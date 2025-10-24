export interface Cat {
  name: string
  age: number
  breed: string
  personality: string[]
  images: string[]
}

const cats: Cat[] = [
  {
    name: 'Milo',
    age: 2,
    breed: 'British Shorthair',
    personality: ['playful', 'curious', 'friendly'],
    images: ['1.jpg', '1-2.jpg', '1-3.jpg'],
  },
  {
    name: 'Luna',
    age: 1,
    breed: 'Sphynx',
    personality: ['affectionate', 'vocal', 'energetic'],
    images: ['2.jpg', '2-2.jpg'],
  },
  {
    name: 'Oliver',
    age: 3,
    breed: 'Maine Coon',
    personality: ['gentle', 'lazy', 'fluffy'],
    images: ['3.jpg', '3-2.jpg', '3-3.jpg', '3-4.jpg'],
  },
  {
    name: 'Cleo',
    age: 4,
    breed: 'Siamese',
    personality: ['intelligent', 'talkative', 'loyal'],
    images: ['4.jpg', '4-2.jpg'],
  },
  {
    name: 'Nala',
    age: 5,
    breed: 'Ragdoll',
    personality: ['calm', 'friendly', 'affectionate'],
    images: ['5.jpg', '5-2.jpg', '5-3.jpg'],
  },
  {
    name: 'Simba',
    age: 2,
    breed: 'Bengal',
    personality: ['adventurous', 'energetic', 'curious'],
    images: ['6.jpg', '6-2.jpg', '6-3.jpg'],
  },
]

export default cats
