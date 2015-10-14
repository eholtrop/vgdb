SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS release_dates;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS consoles;

CREATE TABLE IF NOT EXISTS `users` (
    user_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
)engine=innodb;

CREATE TABLE IF NOT EXISTS `games` (
  `game_id` int(11) NOT NULL primary key AUTO_INCREMENT,
    `game_name` varchar(100) NOT NULL,
    `picture` varchar(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

CREATE TABLE IF NOT EXISTS `consoles` (
    `console_id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `console_name` varchar(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

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


INSERT INTO `games` (`game_id`, `game_name`, `picture`) VALUES
(1, 'Star Wars: Battlefront', 'http://www.flickeringmyth.com/wp-content/uploads/2015/09/Battlefront.jpg'),
(2, 'Rise of the Tomb Raider', 'http://www.flickeringmyth.com/wp-content/uploads/2015/09/Battlefront.jpg'),
(3, 'Xcom 2', 'http://www.flickeringmyth.com/wp-content/uploads/2015/09/Battlefront.jpg'),
(4, 'Elder Scrolls: Skyrim', 'http://www.flickeringmyth.com/wp-content/uploads/2015/09/Battlefront.jpg'),
(5, 'Persona 5', 'http://www.flickeringmyth.com/wp-content/uploads/2015/09/Battlefront.jpg');


INSERT INTO `consoles` (`console_id`, `console_name`) VALUES
(1, 'Xbox One'),
(2, 'PS4'),
(3, 'PC');


INSERT INTO `release_dates` (`release_date_id`, `console_id`, `game_id`, `release_year`, `release_month`, `release_day`, `release_quarter`) VALUES
(1, 1, 1, 2015, 11, 17, 3),
(2, 2, 1, 2015, 11, 17, 3),
(3, 3, 1, 2015, 11, 17, 3),
(4, 1, 2, 2015, 11, 10, 3),
(5, 2, 5, 2015, -1, -1, -1);
