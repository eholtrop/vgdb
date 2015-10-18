SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS region;
DROP TABLE IF EXISTS release_dates;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS consoles;

CREATE TABLE IF NOT EXISTS `games` (
    `game_id` int(11) NOT NULL primary key AUTO_INCREMENT,
    `game_name` varchar(100) NOT NULL UNIQUE,
    `url` varchar(100),
    `metacritic_score` varchar(100),
    `esrb_rating` varchar(100),
    `picture` varchar(100)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

CREATE TABLE IF NOT EXISTS `consoles` (
    `console_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `console_name` varchar(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

CREATE TABLE IF NOT EXISTS `region` (
    `region_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` varchar(100) not null
) ENGINE=InnoDb;

CREATE TABLE IF NOT EXISTS `release_dates` (
    `release_date_id` int(11) primary key  NOT NULL AUTO_INCREMENT,
    `console_id` int(11) NOT NULL,
    `game_id` int(11) NOT NULL,
    `release_year` int(11),
    `release_month` int(3),
    `release_day` int (4),
    `release_quarter` int(2),
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (console_id) REFERENCES consoles(console_id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

INSERT INTO `consoles` (`console_name`) VALUES
('Xbox One'),
('Xbox 360'),
('PS4'),
('PS3'),
('3DS'),
('PS Vita'),
('PC');


