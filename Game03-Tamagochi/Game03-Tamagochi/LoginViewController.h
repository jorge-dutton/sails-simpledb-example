//
//  ViewController.h
//  Game03-Tamagochi
//
//  Created by Jose Blanco on 5/1/15.
//  Copyright (c) 2015 Medianet. All rights reserved.
//

#import <UIKit/UIKit.h>
@class Persistence;
@interface LoginViewController : UIViewController

@property (weak, nonatomic) IBOutlet UITextField *txtUsuario;
@property (weak, nonatomic) IBOutlet UITextField *txtPassword;

@property (strong, nonatomic) Persistence *persistence;

- (IBAction)accessLogin:(id)sender;
@end

