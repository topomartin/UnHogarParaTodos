
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  WORKER = 'WORKER',
}

export enum AnimalType {
  DOG = 'dog',
  CAT = 'cat',
}

// QUITAR SI SE QUITA ADOPTION
export enum AdoptionStatus {
    AVAILABLE = 'available',
    PENDING = 'pending',
    ADOPTED = 'adopted'
}

export enum AnimalStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  ADOPTED = 'adopted'
}

export enum AnimalRequestType {
    ADOPTION = 'adoption',
    FOSTER = 'foster',
}

export enum AnimalRequestStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export enum FosterStatus {
  ACTIVE = 'active',
  FINISHED = 'finished'

}

export enum HousingType {
    FLAT = 'flat',
    HOUSE = 'house',
    ROOM = 'room',
}

export enum AvailableTime {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum Lifestyle {
    CALM = 'calm',
    ACTIVE = 'active',
}

export enum NoiseTolerance {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum TimeAtHome {
    LITTLE = 'little',
    NORMAL = 'normal',
    LOT = 'lot',
}

export enum SponsorshipFrequency {
  UNIC = 'unic',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}