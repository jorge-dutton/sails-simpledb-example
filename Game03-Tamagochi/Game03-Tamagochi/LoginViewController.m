//
//  ViewController.m
//  Game03-Tamagochi
//
//  Created by Jose Blanco on 5/1/15.
//  Copyright (c) 2015 Medianet. All rights reserved.
//

#import "LoginViewController.h"
#import "Persistence.h"
#import "ShowVideosViewController.h"

@interface LoginViewController ()
-(void)showAlertLogin;
@end

@implementation LoginViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    self.persistence = [[Persistence alloc] init];
    //[self.persistence loadNewUsers];
    //[self.persistence deleteAllUser];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)accessLogin:(id)sender
{
    NSString *solucion = [self.persistence findUsers:self.txtUsuario.text toPassword:self.txtPassword.text];
    //    NSString *solucion = [self.persistence countUser];
    NSLog(@"Solucion: %@", solucion);
    
    if ([solucion isEqualToString: @"OK"])
    {
        [self performSegueWithIdentifier:@"LoginSegue" sender:sender];
    }
    else
    {
        [self showAlertLogin];
    }
}

-(void)showAlertLogin
{
    UIAlertView *alertViewLogin = [[UIAlertView alloc] initWithTitle:NSLocalizedString(@"Login", nil) message:NSLocalizedString(@"Login Incorrecto", nil)delegate:nil cancelButtonTitle:NSLocalizedString(@"OK", nil) otherButtonTitles:nil, nil];
    [alertViewLogin show];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {

    if ([[segue identifier] isEqualToString:@"LoginSegue"]) {
        ShowVideosViewController *showVideosViewController = segue.destinationViewController;
        
        //Se tiene que pasar información del usuario para saber que mostrar si es Admin
    }
}

@end
