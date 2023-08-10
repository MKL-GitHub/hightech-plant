export type PetStatus = 'available' | 'pending' | 'sold';

export interface PetTag {
  id: number,
  name: string,
}

export interface Pet {
  id: number,
  name: string,
  category?: PetTag,
  photoUrls: string[],
  tags: PetTag[],
  status: PetStatus,
}