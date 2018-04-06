import csv

myData = []
dateArray = ["2005-01-05","2005-01-06","2005-01-07","2005-01-08","2005-01-09","2005-01-10","2005-01-11","2005-01-12","2005-01-13","2005-01-14","2005-01-15","2005-01-16","2005-01-17","2005-01-18","2005-01-19","2005-01-20","2005-01-21","2005-01-22","2005-01-23","2005-01-24","2005-01-25","2005-01-26","2005-01-27","2005-01-28","2005-01-29","2005-01-30","2005-01-31","2005-02-01","2005-02-02","2005-02-03","2005-02-04","2005-02-05","2005-02-06","2005-02-07","2005-02-08","2005-02-09","2005-02-10","2005-02-11","2005-02-12","2005-02-13","2005-02-14","2005-02-15","2005-02-16","2005-02-17","2005-02-18","2005-02-19","2005-02-20","2005-02-21","2005-02-22","2005-02-23","2005-02-24","2005-02-25","2005-02-26","2005-02-27","2005-02-28","2005-03-01","2005-03-02","2005-03-03","2005-03-04","2005-03-05","2005-03-06","2005-03-07","2005-03-08","2005-03-09","2005-03-10","2005-03-11","2005-03-12","2005-03-13","2005-03-14","2005-03-15","2005-03-16","2005-03-17","2005-03-18","2005-03-19","2005-03-20","2005-03-21","2005-03-22","2005-03-23","2005-03-24","2005-03-25","2005-03-26","2005-03-27","2005-03-28","2005-03-29","2005-03-30","2005-03-31","2005-04-01","2005-04-02","2005-04-03","2005-04-04","2005-04-05","2005-04-06","2005-04-07","2005-04-08","2005-04-09","2005-04-10","2005-04-11","2005-04-12","2005-04-13","2005-04-14","2005-04-15","2005-04-16","2005-04-17","2005-04-18","2005-04-19","2005-04-20","2005-04-21","2005-04-22","2005-04-23","2005-04-24","2005-04-25","2005-04-26","2005-04-27","2005-04-28","2005-04-29","2005-04-30","2005-05-01","2005-05-02","2005-05-03","2005-05-04","2005-05-05","2005-05-06","2005-05-07","2005-05-08","2005-05-09","2005-05-10","2005-05-11","2005-05-12","2005-05-13","2005-05-14","2005-05-15","2005-05-16","2005-05-17","2005-05-18","2005-05-19","2005-05-20","2005-05-21","2005-05-22","2005-05-23","2005-05-24","2005-05-25","2005-05-26","2005-05-27","2005-05-28","2005-05-29","2005-05-30","2005-05-31","2005-06-01","2005-06-02","2005-06-03","2005-06-04","2005-06-05","2005-06-06","2005-06-07","2005-06-08","2005-06-09","2005-06-10","2005-06-11","2005-06-12","2005-06-13","2005-06-14","2005-06-15","2005-06-16","2005-06-17","2005-06-18","2005-06-19","2005-06-20","2005-06-21","2005-06-22","2005-06-23","2005-06-24","2005-06-25","2005-06-26","2005-06-27","2005-06-28","2005-06-29","2005-06-30","2005-07-01","2005-07-02","2005-07-03","2005-07-04","2005-07-05","2005-07-06","2005-07-07","2005-07-08","2005-07-09","2005-07-10","2005-07-11","2005-07-12","2005-07-13","2005-07-14","2005-07-15","2005-07-16","2005-07-17","2005-07-18","2005-07-19","2005-07-20","2005-07-21","2005-07-22","2005-07-23","2005-07-24","2005-07-25","2005-07-26","2005-07-27","2005-07-28","2005-07-29","2005-07-30","2005-07-31","2005-08-01","2005-08-02","2005-08-03","2005-08-04","2005-08-05","2005-08-06","2005-08-07","2005-08-08","2005-08-09","2005-08-10","2005-08-11","2005-08-12","2005-08-13","2005-08-14","2005-08-15","2005-08-16","2005-08-17","2005-08-18","2005-08-19","2005-08-20","2005-08-21","2005-08-22","2005-08-23","2005-08-24","2005-08-25","2005-08-26","2005-08-27","2005-08-28","2005-08-29","2005-08-30","2005-08-31","2005-09-01","2005-09-02","2005-09-03","2005-09-04","2005-09-05","2005-09-06","2005-09-07","2005-09-08","2005-09-09","2005-09-10","2005-09-11","2005-09-12","2005-09-13","2005-09-14","2005-09-15","2005-09-16","2005-09-17","2005-09-18","2005-09-19","2005-09-20","2005-09-21","2005-09-22","2005-09-23","2005-09-24","2005-09-25","2005-09-26","2005-09-27","2005-09-28","2005-09-29","2005-09-30","2005-10-01","2005-10-02","2005-10-03","2005-10-04","2005-10-05","2005-10-06","2005-10-07","2005-10-08","2005-10-09","2005-10-10","2005-10-11","2005-10-12","2005-10-13","2005-10-14","2005-10-15","2005-10-16","2005-10-17","2005-10-18","2005-10-19","2005-10-20","2005-10-21","2005-10-22","2005-10-23","2005-10-24","2005-10-25","2005-10-26","2005-10-27","2005-10-28","2005-10-29","2005-10-30","2005-10-31","2005-11-01","2005-11-02","2005-11-03","2005-11-04","2005-11-05","2005-11-06","2005-11-07","2005-11-08","2005-11-09","2005-11-10","2005-11-11","2005-11-12","2005-11-13","2005-11-14","2005-11-15","2005-11-16","2005-11-17","2005-11-18","2005-11-19","2005-11-20","2005-11-21","2005-11-22","2005-11-23","2005-11-24","2005-11-25","2005-11-26","2005-11-27","2005-11-28","2005-11-29","2005-11-30","2005-12-01","2005-12-02","2005-12-03","2005-12-04","2005-12-05","2005-12-06","2005-12-07","2005-12-08","2005-12-09","2005-12-10","2005-12-11","2005-12-12","2005-12-13","2005-12-14","2005-12-15","2005-12-16","2005-12-17","2005-12-18","2005-12-19","2005-12-20","2005-12-21","2005-12-22","2005-12-23","2005-12-24","2005-12-25","2005-12-26","2005-12-27","2005-12-28","2005-12-29","2005-12-30","2005-12-31","2006-01-01","2006-01-02","2006-01-03","2006-01-04","2006-01-05","2006-01-06","2006-01-07","2006-01-08","2006-01-09","2006-01-10","2006-01-11","2006-01-12","2006-01-13","2006-01-14","2006-01-15","2006-01-16","2006-01-17","2006-01-18","2006-01-19","2006-01-20","2006-01-21","2006-01-22","2006-01-23","2006-01-24","2006-01-25","2006-01-26","2006-01-27","2006-01-28","2006-01-29","2006-01-30","2006-01-31","2006-02-01","2006-02-02","2006-02-03","2006-02-04","2006-02-05","2006-02-06","2006-02-07","2006-02-08","2006-02-09","2006-02-10","2006-02-11","2006-02-12","2006-02-13","2006-02-14","2006-02-15","2006-02-16","2006-02-17","2006-02-18","2006-02-19","2006-02-20","2006-02-21","2006-02-22","2006-02-23","2006-02-24","2006-02-25","2006-02-26","2006-02-27","2006-02-28","2006-03-01","2006-03-02","2006-03-03","2006-03-04","2006-03-05","2006-03-06","2006-03-07","2006-03-08","2006-03-09","2006-03-10","2006-03-11","2006-03-12","2006-03-13","2006-03-14","2006-03-15","2006-03-16","2006-03-17","2006-03-18","2006-03-19","2006-03-20","2006-03-21","2006-03-22","2006-03-23","2006-03-24","2006-03-25","2006-03-26","2006-03-27","2006-03-28","2006-03-29","2006-03-30","2006-03-31","2006-04-01","2006-04-02","2006-04-03","2006-04-04","2006-04-05","2006-04-06","2006-04-07","2006-04-08","2006-04-09","2006-04-10","2006-04-11","2006-04-12","2006-04-13","2006-04-14","2006-04-15","2006-04-16","2006-04-17","2006-04-18","2006-04-19","2006-04-20","2006-04-21","2006-04-22","2006-04-23","2006-04-24","2006-04-25","2006-04-26","2006-04-27","2006-04-28","2006-04-29","2006-04-30","2006-05-01","2006-05-02","2006-05-03","2006-05-04","2006-05-05","2006-05-06","2006-05-07","2006-05-08","2006-05-09","2006-05-10","2006-05-11","2006-05-12","2006-05-13","2006-05-14","2006-05-15","2006-05-16","2006-05-17","2006-05-18","2006-05-19","2006-05-20","2006-05-21","2006-05-22","2006-05-23","2006-05-24","2006-05-25","2006-05-26","2006-05-27","2006-05-28","2006-05-29","2006-05-30","2006-05-31","2006-06-01","2006-06-02","2006-06-03","2006-06-04","2006-06-05","2006-06-06","2006-06-07","2006-06-08","2006-06-09","2006-06-10","2006-06-11","2006-06-12","2006-06-13","2006-06-14","2006-06-15","2006-06-16","2006-06-17","2006-06-18","2006-06-19","2006-06-20","2006-06-21","2006-06-22","2006-06-23","2006-06-24","2006-06-25","2006-06-26","2006-06-27","2006-06-28","2006-06-29","2006-06-30","2006-07-01","2006-07-02","2006-07-03","2006-07-04","2006-07-05","2006-07-06","2006-07-07","2006-07-08","2006-07-09","2006-07-10","2006-07-11","2006-07-12","2006-07-13","2006-07-14","2006-07-15","2006-07-16","2006-07-17","2006-07-18","2006-07-19","2006-07-20","2006-07-21","2006-07-22","2006-07-23","2006-07-24","2006-07-25","2006-07-26","2006-07-27","2006-07-28","2006-07-29","2006-07-30","2006-07-31","2006-08-01","2006-08-02","2006-08-03","2006-08-04","2006-08-05","2006-08-06","2006-08-07","2006-08-08","2006-08-09","2006-08-10","2006-08-11","2006-08-12","2006-08-13","2006-08-14","2006-08-15","2006-08-16","2006-08-17","2006-08-18","2006-08-19","2006-08-20","2006-08-21","2006-08-22","2006-08-23","2006-08-24","2006-08-25","2006-08-26","2006-08-27","2006-08-28","2006-08-29","2006-08-30","2006-08-31","2006-09-01","2006-09-02","2006-09-03","2006-09-04","2006-09-05","2006-09-06","2006-09-07","2006-09-08","2006-09-09","2006-09-10","2006-09-11","2006-09-12","2006-09-13","2006-09-14","2006-09-15","2006-09-16","2006-09-17","2006-09-18","2006-09-19","2006-09-20","2006-09-21","2006-09-22","2006-09-23","2006-09-24","2006-09-25","2006-09-26","2006-09-27","2006-09-28","2006-09-29","2006-09-30","2006-10-01","2006-10-02","2006-10-03","2006-10-04","2006-10-05","2006-10-06","2006-10-07","2006-10-08","2006-10-09","2006-10-10","2006-10-11","2006-10-12","2006-10-13","2006-10-14","2006-10-15","2006-10-16","2006-10-17","2006-10-18","2006-10-19","2006-10-20","2006-10-21","2006-10-22","2006-10-23","2006-10-24","2006-10-25","2006-10-26","2006-10-27","2006-10-28","2006-10-29","2006-10-30","2006-10-31","2006-11-01","2006-11-02","2006-11-03","2006-11-04","2006-11-05","2006-11-06","2006-11-07","2006-11-08","2006-11-09","2006-11-10","2006-11-11","2006-11-12","2006-11-13","2006-11-14","2006-11-15","2006-11-16","2006-11-17","2006-11-18","2006-11-19","2006-11-20","2006-11-21","2006-11-22","2006-11-23","2006-11-24","2006-11-25","2006-11-26","2006-11-27","2006-11-28","2006-11-29","2006-11-30","2006-12-01","2006-12-02","2006-12-03","2006-12-04","2006-12-05","2006-12-06","2006-12-07","2006-12-08","2006-12-09","2006-12-10","2006-12-11","2006-12-12","2006-12-13","2006-12-14","2006-12-15","2006-12-16","2006-12-17","2006-12-18","2006-12-19","2006-12-20","2006-12-21","2006-12-22","2006-12-23","2006-12-24","2006-12-25","2006-12-26","2006-12-27","2006-12-28","2006-12-29","2006-12-30","2006-12-31","2007-01-01","2007-01-02","2007-01-03","2007-01-04","2007-01-05","2007-01-06","2007-01-07","2007-01-08","2007-01-09","2007-01-10","2007-01-11","2007-01-12","2007-01-13","2007-01-14","2007-01-15","2007-01-16","2007-01-17","2007-01-18","2007-01-19","2007-01-20","2007-01-21","2007-01-22","2007-01-23","2007-01-24","2007-01-25","2007-01-26","2007-01-27","2007-01-28","2007-01-29","2007-01-30","2007-01-31","2007-02-01","2007-02-02","2007-02-03","2007-02-04","2007-02-05","2007-02-06","2007-02-07","2007-02-08","2007-02-09","2007-02-10","2007-02-11","2007-02-12","2007-02-13","2007-02-14","2007-02-15","2007-02-16","2007-02-17","2007-02-18","2007-02-19","2007-02-20","2007-02-21","2007-02-22","2007-02-23","2007-02-24","2007-02-25","2007-02-26","2007-02-27","2007-02-28","2007-03-01","2007-03-02","2007-03-03","2007-03-04","2007-03-05","2007-03-06","2007-03-07","2007-03-08","2007-03-09","2007-03-10","2007-03-11","2007-03-12","2007-03-13","2007-03-14","2007-03-15","2007-03-16","2007-03-17","2007-03-18","2007-03-19","2007-03-20","2007-03-21","2007-03-22","2007-03-23","2007-03-24","2007-03-25","2007-03-26","2007-03-27","2007-03-28","2007-03-29","2007-03-30","2007-03-31","2007-04-01","2007-04-02","2007-04-03","2007-04-04","2007-04-05","2007-04-06","2007-04-07","2007-04-08","2007-04-09","2007-04-10","2007-04-11","2007-04-12","2007-04-13","2007-04-14","2007-04-15","2007-04-16","2007-04-17","2007-04-18","2007-04-19","2007-04-20","2007-04-21","2007-04-22","2007-04-23","2007-04-24","2007-04-25","2007-04-26","2007-04-27","2007-04-28","2007-04-29","2007-04-30","2007-05-01","2007-05-02","2007-05-03","2007-05-04","2007-05-05","2007-05-06","2007-05-07","2007-05-08","2007-05-09","2007-05-10","2007-05-11","2007-05-12","2007-05-13","2007-05-14","2007-05-15","2007-05-16","2007-05-17","2007-05-18","2007-05-19","2007-05-20","2007-05-21","2007-05-22","2007-05-23","2007-05-24","2007-05-25","2007-05-26","2007-05-27","2007-05-28","2007-05-29","2007-05-30","2007-05-31","2007-06-01","2007-06-02","2007-06-03","2007-06-04","2007-06-05","2007-06-06","2007-06-07","2007-06-08","2007-06-09","2007-06-10","2007-06-11","2007-06-12","2007-06-13","2007-06-14","2007-06-15","2007-06-16","2007-06-17","2007-06-18","2007-06-19","2007-06-20","2007-06-21","2007-06-22","2007-06-23","2007-06-24","2007-06-25","2007-06-26","2007-06-27","2007-06-28","2007-06-29","2007-06-30","2007-07-01","2007-07-02","2007-07-03","2007-07-04","2007-07-05","2007-07-06","2007-07-07","2007-07-08","2007-07-09","2007-07-10","2007-07-11","2007-07-12","2007-07-13","2007-07-14","2007-07-15","2007-07-16","2007-07-17","2007-07-18","2007-07-19","2007-07-20","2007-07-21","2007-07-22","2007-07-23","2007-07-24","2007-07-25","2007-07-26","2007-07-27","2007-07-28","2007-07-29","2007-07-30","2007-07-31","2007-08-01","2007-08-02","2007-08-03","2007-08-04","2007-08-05","2007-08-06","2007-08-07","2007-08-08","2007-08-09","2007-08-10","2007-08-11","2007-08-12","2007-08-13","2007-08-14","2007-08-15","2007-08-16","2007-08-17","2007-08-18","2007-08-19","2007-08-20","2007-08-21","2007-08-22","2007-08-23","2007-08-24","2007-08-25","2007-08-26","2007-08-27","2007-08-28","2007-08-29","2007-08-30","2007-08-31","2007-09-01","2007-09-02","2007-09-03","2007-09-04","2007-09-05","2007-09-06","2007-09-07","2007-09-08","2007-09-09","2007-09-10","2007-09-11","2007-09-12","2007-09-13","2007-09-14","2007-09-15","2007-09-16","2007-09-17","2007-09-18","2007-09-19","2007-09-20","2007-09-21","2007-09-22","2007-09-23","2007-09-24","2007-09-25","2007-09-26","2007-09-27","2007-09-28","2007-09-29","2007-09-30","2007-10-01","2007-10-02","2007-10-03","2007-10-04","2007-10-05","2007-10-06","2007-10-07","2007-10-08","2007-10-09","2007-10-10","2007-10-11","2007-10-12","2007-10-13","2007-10-14","2007-10-15","2007-10-16","2007-10-17","2007-10-18","2007-10-19","2007-10-20","2007-10-21","2007-10-22","2007-10-23","2007-10-24","2007-10-25","2007-10-26","2007-10-27","2007-10-28","2007-10-29","2007-10-30","2007-10-31","2007-11-01","2007-11-02","2007-11-03","2007-11-04","2007-11-05","2007-11-06","2007-11-07","2007-11-08","2007-11-09","2007-11-10","2007-11-11","2007-11-12","2007-11-13","2007-11-14","2007-11-15","2007-11-16","2007-11-17","2007-11-18","2007-11-19","2007-11-20","2007-11-21","2007-11-22","2007-11-23","2007-11-24","2007-11-25","2007-11-26","2007-11-27","2007-11-28","2007-11-29","2007-11-30","2007-12-01","2007-12-02","2007-12-03","2007-12-04","2007-12-05","2007-12-06","2007-12-07","2007-12-08","2007-12-09","2007-12-10","2007-12-11","2007-12-12","2007-12-13","2007-12-14","2007-12-15","2007-12-16","2007-12-17","2007-12-18","2007-12-19","2007-12-20","2007-12-21","2007-12-22","2007-12-23","2007-12-24","2007-12-25","2007-12-26","2007-12-27","2007-12-28","2007-12-29","2007-12-30","2007-12-31","2008-01-01","2008-01-02","2008-01-03","2008-01-04","2008-01-05","2008-01-06","2008-01-07","2008-01-08","2008-01-09","2008-01-10","2008-01-11","2008-01-12","2008-01-13","2008-01-14","2008-01-15","2008-01-16","2008-01-17","2008-01-18","2008-01-19","2008-01-20","2008-01-21","2008-01-22","2008-01-23","2008-01-24","2008-01-25","2008-01-26","2008-01-27","2008-01-28","2008-01-29","2008-01-30","2008-01-31","2008-02-01","2008-02-02","2008-02-03","2008-02-04","2008-02-05","2008-02-06","2008-02-07","2008-02-08","2008-02-09","2008-02-10","2008-02-11","2008-02-12","2008-02-13","2008-02-14","2008-02-15","2008-02-16","2008-02-17","2008-02-18","2008-02-19","2008-02-20","2008-02-21","2008-02-22","2008-02-23","2008-02-24","2008-02-25","2008-02-26","2008-02-27","2008-02-28","2008-02-29","2008-03-01","2008-03-02","2008-03-03","2008-03-04","2008-03-05","2008-03-06","2008-03-07","2008-03-08","2008-03-09","2008-03-10","2008-03-11","2008-03-12","2008-03-13","2008-03-14","2008-03-15","2008-03-16","2008-03-17","2008-03-18","2008-03-19","2008-03-20","2008-03-21","2008-03-22","2008-03-23","2008-03-24","2008-03-25","2008-03-26","2008-03-27","2008-03-28","2008-03-29","2008-03-30","2008-03-31","2008-04-01","2008-04-02","2008-04-03","2008-04-04","2008-04-05","2008-04-06","2008-04-07","2008-04-08","2008-04-09","2008-04-10","2008-04-11","2008-04-12","2008-04-13","2008-04-14","2008-04-15","2008-04-16","2008-04-17","2008-04-18","2008-04-19","2008-04-20","2008-04-21","2008-04-22","2008-04-23","2008-04-24","2008-04-25","2008-04-26","2008-04-27","2008-04-28","2008-04-29","2008-04-30","2008-05-01","2008-05-02","2008-05-03","2008-05-04","2008-05-05","2008-05-06","2008-05-07","2008-05-08","2008-05-09","2008-05-10","2008-05-11","2008-05-12","2008-05-13","2008-05-14","2008-05-15","2008-05-16","2008-05-17","2008-05-18","2008-05-19","2008-05-20","2008-05-21","2008-05-22","2008-05-23","2008-05-24","2008-05-25","2008-05-26","2008-05-27","2008-05-28","2008-05-29","2008-05-30","2008-05-31","2008-06-01","2008-06-02","2008-06-03","2008-06-04","2008-06-05","2008-06-06","2008-06-07","2008-06-08","2008-06-09","2008-06-10","2008-06-11","2008-06-12","2008-06-13","2008-06-14","2008-06-15","2008-06-16","2008-06-17","2008-06-18","2008-06-19","2008-06-20","2008-06-21","2008-06-22","2008-06-23","2008-06-24","2008-06-25","2008-06-26","2008-06-27","2008-06-28","2008-06-29","2008-06-30","2008-07-01","2008-07-02","2008-07-03","2008-07-04","2008-07-05","2008-07-06","2008-07-07","2008-07-08","2008-07-09","2008-07-10","2008-07-11","2008-07-12","2008-07-13","2008-07-14","2008-07-15","2008-07-16","2008-07-17","2008-07-18","2008-07-19","2008-07-20","2008-07-21","2008-07-22","2008-07-23","2008-07-24","2008-07-25","2008-07-26","2008-07-27","2008-07-28","2008-07-29","2008-07-30","2008-07-31","2008-08-01","2008-08-02","2008-08-03","2008-08-04","2008-08-05","2008-08-06","2008-08-07","2008-08-08","2008-08-09","2008-08-10","2008-08-11","2008-08-12","2008-08-13","2008-08-14","2008-08-15","2008-08-16","2008-08-17","2008-08-18","2008-08-19","2008-08-20","2008-08-21","2008-08-22","2008-08-23","2008-08-24","2008-08-25","2008-08-26","2008-08-27","2008-08-28","2008-08-29","2008-08-30","2008-08-31","2008-09-01","2008-09-02","2008-09-03","2008-09-04","2008-09-05","2008-09-06","2008-09-07","2008-09-08","2008-09-09","2008-09-10","2008-09-11","2008-09-12","2008-09-13","2008-09-14","2008-09-15","2008-09-16","2008-09-17","2008-09-18","2008-09-19","2008-09-20","2008-09-21","2008-09-22","2008-09-23","2008-09-24","2008-09-25","2008-09-26","2008-09-27","2008-09-28","2008-09-29","2008-09-30","2008-10-01","2008-10-02","2008-10-03","2008-10-04","2008-10-05","2008-10-06","2008-10-07","2008-10-08","2008-10-09","2008-10-10","2008-10-11","2008-10-12","2008-10-13","2008-10-14","2008-10-15","2008-10-16","2008-10-17","2008-10-18","2008-10-19","2008-10-20","2008-10-21","2008-10-22","2008-10-23","2008-10-24","2008-10-25","2008-10-26","2008-10-27","2008-10-28","2008-10-29","2008-10-30","2008-10-31","2008-11-01","2008-11-02","2008-11-03","2008-11-04","2008-11-05","2008-11-06","2008-11-07","2008-11-08","2008-11-09","2008-11-10","2008-11-11","2008-11-12","2008-11-13","2008-11-14","2008-11-15","2008-11-16","2008-11-17","2008-11-18","2008-11-19","2008-11-20","2008-11-21","2008-11-22","2008-11-23","2008-11-24","2008-11-25","2008-11-26","2008-11-27","2008-11-28","2008-11-29","2008-11-30","2008-12-01","2008-12-02","2008-12-03","2008-12-04","2008-12-05","2008-12-06","2008-12-07","2008-12-08","2008-12-09","2008-12-10","2008-12-11","2008-12-12","2008-12-13","2008-12-14","2008-12-15","2008-12-16","2008-12-17","2008-12-18","2008-12-19","2008-12-20","2008-12-21","2008-12-22","2008-12-23","2008-12-24","2008-12-25","2008-12-26","2008-12-27","2008-12-28","2008-12-29","2008-12-30","2008-12-31","2009-01-01","2009-01-02","2009-01-03","2009-01-04","2009-01-05","2009-01-06","2009-01-07","2009-01-08","2009-01-09","2009-01-10","2009-01-11","2009-01-12","2009-01-13","2009-01-14","2009-01-15","2009-01-16","2009-01-17","2009-01-18","2009-01-19","2009-01-20","2009-01-21","2009-01-22","2009-01-23","2009-01-24","2009-01-25","2009-01-26","2009-01-27","2009-01-28","2009-01-29","2009-01-30","2009-01-31","2009-02-01","2009-02-02","2009-02-03","2009-02-04","2009-02-05","2009-02-06","2009-02-07","2009-02-08","2009-02-09","2009-02-10","2009-02-11","2009-02-12","2009-02-13","2009-02-14"]

currentPatient = []
currentPatientModified = []

with open('TimeRiderDataFinal.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        myData.append({'ID': row[0],
         'Name': row[1],
         'Birthday': row[2],
         'Gender': row[3],
         'Date': row[4],
         'Size': row[5],
         'Weight': row[6],
         'BMI': row[7],
         'NBZ': row[8],
         'HbA1c': row[9],
         'Chol': row[10],
         'TG': row[11],
         'Crea': row[12],
         'Protein_in_urine': row[13],
         'RR_syst': row[14],
         'RR_diast': row[15],
         'Nikotin': row[16],
         'Retinopathie': row[17],
         'Insult': row[18],
         'KHK': row[19],
         'PAVK': row[20],
         'PNP': row[21],
         'Nephropathie': row[22],
         'SH': row[23],
         'Met': row[24],
         'Glit': row[25],
         'DPP4': row[26],
         'Acarb': row[27],
         'VZI': row[28],
         'ALT': row[29],
         'Misch': row[30],
         'ACE': row[31],
         'Bbl': row[32],
         'RR_sonst': row[33],
         'Statin': row[34],
         'ASS': row[35]
         })

print(myData[1])
with open('ModifiedData.csv', 'w', newline='') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',')
    for i in myData:
    	spamwriter.writerow([i["ID"], i["Name"], i["Birthday"]])
# print("2015-01-31" > "2015-02-31")