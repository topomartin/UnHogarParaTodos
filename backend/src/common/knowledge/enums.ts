
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  WORKER = 'WORKER',
}

export enum AnimalType {
  DOG = 'dog',
  CAT = 'cat',
}

export enum AnimalStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  ADOPTED = 'adopted'
}

export enum AdoptionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// Modificar a FosterStatus??
export enum FosterProfileStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED ='rejected'

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