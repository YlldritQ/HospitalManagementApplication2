export interface TeamDto {
    id: number;
    name: string;
}

export interface CUTeamDto {
    name: string;
}

export interface PlayerDto {
    id: number;
    name: string;
    number: number;
    birthYear: number;
    teamId: number;
}
export interface CUPlayerDto {
    name: string;
    number: number;
    birthYear: number;
    teamId: number;
}

export interface LecturerDto {
    lecturerId: number;
    name: string;
    department: string;
    email: string;
}
export interface CULecturerDto {
    name: string;
    department: string;
    email: string;
}
export interface LectureDto {
    lectureId: number;
    name: string;
    lecturerId: number;
}
export interface CULectureDto {
    name: string;
    lecturerId: number;
}