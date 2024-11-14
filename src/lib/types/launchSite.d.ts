import type { Coordinate } from "./coordinate";

export interface LaunchSite {
    readonly launch_site_id: number;  // Corresponds to the ID of the launch site
    readonly club_id: number;         // Corresponds to the ID of the club
    readonly name: string;            // Name of the launch site (e.g., "Higgs Farm")
    readonly waiver?: number;         // Waiver value, can be nullable or optional
    readonly altitude?: number;      // Altitude (optional as it may be empty)
    readonly location: Coordinate;
    readonly club: string;           // The name of the club (e.g., "Maryland Delaware Rocketry Association")
    readonly association: string;    // The association (e.g., "NAR|TRA")
    readonly website?: string;        // URL for the launch site (e.g., "https://mdrocketry.org/higgs-farm/")
    distance?: number;
}